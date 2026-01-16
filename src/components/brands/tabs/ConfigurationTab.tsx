import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, DollarSign, Target, BarChart2, Layers, Monitor, Share2, ArrowLeft } from 'lucide-react';
import type { Brand, Campaign, CampaignType, Platform, Channel } from '@/services/api';
import { Service } from '@/services/api';
import { toast } from 'sonner';

interface ConfigurationTabProps {
    brand: Brand;
}

export const ConfigurationTab: React.FC<ConfigurationTabProps> = ({ brand }) => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Fetch campaigns
    useEffect(() => {
        loadCampaigns();
    }, [brand.id]);

    const loadCampaigns = async () => {
        try {
            const data = await Service.getCampaigns(brand.id);
            setCampaigns(data);
        } catch (error) {
            console.error('Error loading campaigns:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading campaigns...</div>;

    if (selectedCampaign) {
        return (
            <CampaignDetailView
                campaign={selectedCampaign}
                onBack={() => setSelectedCampaign(null)}
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium text-white">Campaigns</h3>
                    <p className="text-sm text-gray-400">Manage campaigns and their configuration</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map(campaign => (
                    <CampaignCard
                        key={campaign.id}
                        campaign={campaign}
                        onClick={() => setSelectedCampaign(campaign)}
                        onDelete={async () => {
                            if (confirm('Are you sure you want to delete this campaign?')) {
                                try {
                                    await Service.deleteCampaign(campaign.id);
                                    toast.success("Campaign deleted");
                                    loadCampaigns();
                                } catch (e) {
                                    toast.error("Failed to delete campaign");
                                }
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// --- Sub-Components ---
const CampaignCard: React.FC<{ campaign: Campaign; onClick: () => void; onDelete: () => void }> = ({ campaign, onClick, onDelete }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors cursor-pointer group relative" onClick={onClick}>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="p-1 hover:bg-red-500/20 text-red-400 rounded"
            >
                <Trash2 size={16} />
            </button>
        </div>
        <div className="flex items-start justify-between mb-4">
            <div>
                <h4 className="font-medium text-white text-lg">{campaign.name}</h4>
                <div className={`text-xs px-2 py-0.5 rounded-full inline-block mt-2 ${campaign.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    campaign.status === 'draft' ? 'bg-gray-500/20 text-gray-400' :
                        'bg-blue-500/20 text-blue-400'
                    }`}>
                    {campaign.status.toUpperCase()}
                </div>
            </div>
            <Target className="text-blue-400" size={24} />
        </div>
        <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : 'N/A'} - {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
                <DollarSign size={14} />
                <span>Budget: ${campaign.budgetPlanned?.toLocaleString() || '0'}</span>
            </div>
            <div className="flex items-center gap-2">
                <BarChart2 size={14} />
                <span>KPI: {campaign.objective || 'N/A'}</span>
            </div>
        </div>
    </div>
);

const CampaignDetailView: React.FC<{ campaign: Campaign; onBack: () => void }> = ({ campaign, onBack }) => {
    // Nested Hierarchy Managers
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full text-white">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-xl font-bold text-white">{campaign.name}</h2>
                    <p className="text-gray-400 text-sm">{campaign.objective || 'No Objective'} • {campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : 'N/A'} - {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'N/A'}</p>
                </div>
            </div>

            <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Layers size={18} /> Campaign Types
                </h3>
                <CampaignTypesManager campaignId={campaign.id} />
            </div>

            <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Monitor size={18} /> Platforms
                </h3>
                <PlatformsManager />
            </div>
        </div>
    );
};

const CampaignTypesManager: React.FC<{ campaignId: string }> = ({ campaignId }) => {
    const [types, setTypes] = useState<CampaignType[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newTypeName, setNewTypeName] = useState('');

    const loadTypes = async () => {
        const data = await Service.getCampaignTypes(campaignId);
        setTypes(data);
    };

    useEffect(() => { loadTypes(); }, [campaignId]);

    const handleAdd = async () => {
        if (!newTypeName) return;
        try {
            await Service.createCampaignType({ campaignId, typeName: newTypeName });
            toast.success(`Campaign type '${newTypeName}' added`);
            setNewTypeName('');
            setIsAdding(false);
            loadTypes();
        } catch (e) {
            toast.error("Failed to add campaign type");
        }
    };

    return (
        <div className="space-y-4">
            {types.map(type => (
                <div key={type.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{type.typeName}</span>
                    </div>
                </div>
            ))}

            {isAdding ? (
                <div className="flex gap-2">
                    <input
                        className="bg-black/20 border border-white/10 rounded px-3 py-2 text-white flex-1"
                        placeholder="Type Name (e.g., Paid Media)"
                        value={newTypeName}
                        onChange={e => setNewTypeName(e.target.value)}
                    />
                    <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                    <button onClick={() => setIsAdding(false)} className="text-gray-400 px-3">Cancel</button>
                </div>
            ) : (
                <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm">
                    <Plus size={16} /> Add Campaign Type
                </button>
            )}
        </div>
    );
};

const PlatformsManager: React.FC = () => {
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');

    const load = async () => {
        const data = await Service.getPlatforms();
        setPlatforms(data);
    };

    useEffect(() => { load(); }, []);

    const handleAdd = async () => {
        if (!newName) return;
        try {
            await Service.createPlatform({ name: newName });
            toast.success(`Platform '${newName}' added`);
            setNewName('');
            setIsAdding(false);
            load();
        } catch (e) {
            toast.error("Failed to add platform");
        }
    };

    return (
        <div className="space-y-4">
            <h5 className="text-xs uppercase text-gray-500 font-semibold mb-2">Platforms</h5>
            {platforms.map(p => (
                <div key={p.id} className="bg-black/20 rounded p-3">
                    <div className="text-sm text-white font-medium mb-2 flex items-center gap-2">
                        <Monitor size={14} /> {p.name}
                    </div>
                    <ChannelsManager platformId={p.id} />
                </div>
            ))}
            {isAdding ? (
                <div className="flex gap-2">
                    <input
                        className="bg-black/20 border border-white/10 rounded px-2 py-1 text-sm text-white flex-1"
                        placeholder="Platform Name"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                    />
                    <button onClick={handleAdd} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Save</button>
                    <button onClick={() => setIsAdding(false)} className="text-gray-400 px-2 text-xs">Cancel</button>
                </div>
            ) : (
                <button onClick={() => setIsAdding(true)} className="flex items-center gap-1 text-gray-400 hover:text-white text-xs mt-2">
                    <Plus size={12} /> Add Platform
                </button>
            )}
        </div>
    );
};

const ChannelsManager: React.FC<{ platformId: string }> = ({ platformId }) => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');

    const load = async () => {
        const data = await Service.getChannels(platformId);
        setChannels(data);
    };

    useEffect(() => { load(); }, [platformId]);

    const handleAdd = async () => {
        if (!newName) return;
        try {
            await Service.createChannel({
                platformId,
                name: newName,
                slug: newName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            });
            toast.success(`Channel '${newName}' added`);
            setNewName('');
            setIsAdding(false);
            load();
        } catch (e) {
            toast.error("Failed to add channel");
        }
    };

    return (
        <div className="ml-4 mt-2 space-y-2">
            {channels.map(c => (
                <div key={c.id} className="flex items-center gap-2 text-xs text-gray-300">
                    <Share2 size={12} />
                    <span>{c.name}</span>
                </div>
            ))}
            {isAdding ? (
                <div className="flex gap-2">
                    <input
                        className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs text-white flex-1"
                        placeholder="Channel Name"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                    />
                    <button onClick={handleAdd} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Save</button>
                    <button onClick={() => setIsAdding(false)} className="text-gray-400 px-2 text-xs">Cancel</button>
                </div>
            ) : (
                <button onClick={() => setIsAdding(true)} className="flex items-center gap-1 text-gray-500 hover:text-gray-300 text-xs">
                    <Plus size={10} /> Add Channel
                </button>
            )}
        </div>
    );
};
