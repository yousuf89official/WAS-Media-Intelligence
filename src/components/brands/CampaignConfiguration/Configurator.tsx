'use client';

import { useState, useEffect } from 'react';
import { Campaign, api } from '@/services/api'; // Updated import
import { useMasterData } from '@/contexts/MasterDataContext';
import { CSS_MOCKUPS } from '@/constants';
import { ChannelSelector } from './ChannelSelector';
import { MetricManager } from './MetricManager';
import { MockupPreview } from './MockupPreview';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

interface ConfiguratorProps {
    campaign: Campaign;
    onClose: () => void;
}

export const Configurator = ({ campaign, onClose }: ConfiguratorProps) => {
    // Context
    const { campaignTypes, metrics } = useMasterData();

    // Local State
    const [loading, setLoading] = useState(false);
    const [selectedChannelIds, setSelectedChannelIds] = useState<string[]>([]);

    // Configuration JSON fields (Metrics, Type, Mockup prefernces)
    const [config, setConfig] = useState<any>({
        campaignTypeId: '',
        selectedMetricIds: [],
        metricValues: {},
        mockupId: ''
    });

    // Load initial data
    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                // 1. Fetch linked channels
                const channels = await api.campaigns.getChannels(campaign.id);
                setSelectedChannelIds(channels.map(c => c.id));

                // 2. Parse existing configuration from Campaign JSON column
                // Note: campaign prop might be stale if we just fetched it, but ideally it passed current data.
                // If campaign.configuration is a string (JSON column sometimes returns string in some drivers), parse it.
                // Assuming it's already an object thanks to backend parsing or passing from dashboard.
                const existingConfig = (campaign as any).configuration || {};

                setConfig({
                    campaignTypeId: existingConfig.campaignTypeId || '',
                    selectedMetricIds: existingConfig.selectedMetricIds || [],
                    metricValues: existingConfig.metricValues || {},
                    mockupId: existingConfig.mockupId || ''
                });

            } catch (e) {
                console.error("Failed to load configuration", e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [campaign.id]);

    const selectedType = campaignTypes.find(t => t.id === config.campaignTypeId);

    // Filter available mockups based on selected channels
    const availableMockups = CSS_MOCKUPS.filter(m => selectedChannelIds.includes(m.channelId));
    const currentMockup = availableMockups.find(m => m.id === config.mockupId) || availableMockups[0];

    // Auto-select first mockup if available and none selected
    useEffect(() => {
        if (!config.mockupId && availableMockups.length > 0) {
            setConfig((prev: any) => ({ ...prev, mockupId: availableMockups[0].id }));
        }
    }, [availableMockups.length]);

    const handleChannelToggle = (id: string) => {
        setSelectedChannelIds(prev => {
            const newChannels = prev.includes(id)
                ? prev.filter(c => c !== id)
                : [...prev, id];

            return newChannels;
        });

        // Update metrics separately or wait for save? 
        // Logic: cleanup metrics for removed channels
        // We can do this cleanup on save or here. Doing here for UI consistency.
        setConfig((prev: any) => {
            // Logic to remove metrics if channel removed
            return prev;
        });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // 1. Save Channels
            await api.campaigns.saveChannels(campaign.id, selectedChannelIds);

            // 2. Save Configuration (Metrics, Type, etc.) to JSON column
            await api.campaigns.update(campaign.id, {
                configuration: config
            });

            toast.success("Campaign configuration updated");
            onClose();
        } catch (e) {
            console.error(e);
            toast.error("Failed to save configuration");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 text-white">
            {/* Header / Nav */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
                        <ArrowLeft size={18} />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Configure: {campaign.name}</h2>
                        <p className="text-muted-foreground">Setup campaign scope, channels, and metrics.</p>
                    </div>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleSave} disabled={loading}>
                    <Save size={16} className="mr-2" /> {loading ? 'Saving...' : 'Save Configuration'}
                </Button>
            </div>

            <div className="grid lg:grid-cols-[1fr_400px] gap-8">
                {/* Left Col: Setup */}
                <div className="space-y-8">
                    {/* 1. Campaign Type */}
                    <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Campaign Type</Label>
                                <Select
                                    value={config.campaignTypeId}
                                    onValueChange={(val) => setConfig((prev: any) => ({ ...prev, campaignTypeId: val }))}
                                >
                                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                        <SelectValue placeholder="Select type..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                                        {campaignTypes.map(t => (
                                            <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedType && (
                                <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-sm">
                                    <p className="font-semibold text-indigo-400 mb-2">Scope of Work:</p>
                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                        {selectedType.scopes?.map((s: { id: string; label: string }) => (
                                            <li key={s.id}>{s.label}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* 2. Channels (Only show if type selected) */}
                    {selectedType && (
                        <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                            <CardContent className="pt-6 space-y-6">
                                <div className="space-y-2">
                                    <Label>Target Channels</Label>
                                    <ChannelSelector
                                        selectedIds={selectedChannelIds}
                                        onToggle={handleChannelToggle}
                                        allowedChannels={selectedType.allowedChannels}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* 3. Metrics (Only show if channels selected) */}
                    {selectedChannelIds.length > 0 && (
                        <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                            <CardContent className="pt-6">
                                <MetricManager
                                    selectedChannelIds={selectedChannelIds}
                                    selectedMetricIds={config.selectedMetricIds || []}
                                    metricValues={config.metricValues || {}}
                                    onUpdateMetrics={(ids, vals) => setConfig((prev: any) => ({ ...prev, selectedMetricIds: ids, metricValues: vals }))}
                                />
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right Col: Preview */}
                <div className="space-y-6">
                    <Label className="text-lg">Live Preview</Label>

                    {availableMockups.length > 0 ? (
                        <div className="sticky top-6 space-y-4">
                            <Select
                                value={config.mockupId || currentMockup?.id}
                                onValueChange={(val) => setConfig((prev: any) => ({ ...prev, mockupId: val }))}
                            >
                                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                    <SelectValue placeholder="Select preview..." />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                                    {availableMockups.map(m => (
                                        <SelectItem key={m.id} value={m.id}>{m.name} ({m.channelId})</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {currentMockup && <MockupPreview mockup={currentMockup} />}
                        </div>
                    ) : (
                        <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl text-muted-foreground text-center p-8">
                            Select a channel and campaign type to view content mockups.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
