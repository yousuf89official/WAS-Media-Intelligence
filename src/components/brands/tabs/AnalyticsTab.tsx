import { useState, useEffect } from 'react';
import { Service, type Brand, type Campaign, type Deliverable } from '@/services/api';
import { CHANNELS } from '@/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, MousePointer, TrendingUp, Users, Filter, Image as ImageIcon } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MockupModal } from '@/components/brands/CampaignConfiguration/MockupModal';
import { Button } from '@/components/ui/button';

interface AnalyticsTabProps {
    brand: Brand;
    filterCampaignId?: string;
}

const formatCurrency = (amount: number, currency = 'IDR') => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const AnalyticsTab = ({ brand, filterCampaignId }: AnalyticsTabProps) => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [selectedDeliverable, setSelectedDeliverable] = useState<{ deliverable: Deliverable, campaignName: string } | null>(null);
    const [dateRange, setDateRange] = useState('30d');

    useEffect(() => {
        Service.getCampaigns(brand.id).then(setCampaigns);
    }, [brand.id]);

    // Filter campaigns if a filter is active
    const filteredCampaigns = filterCampaignId
        ? campaigns.filter(c => c.id === filterCampaignId)
        : campaigns;

    // Aggregate deliverables from filtered campaigns
    const activeDeliverables = filteredCampaigns
        .flatMap(c => (c.configuration?.deliverables || []).map((d: Deliverable) => ({ ...d, campaignName: c.name })))
        .filter(d => d.thumbnailUrl); // Only show if has thumbnail

    // Generate some trend data (Mocked for now, but could be filtered)
    // For simplicity, we just scale the data if filtered to simulate "specific metrics"
    const data = [
        { date: '2024-01-01', impressions: 4000, spend: 2400000 },
        { date: '2024-01-05', impressions: 3000, spend: 1398000 },
        { date: '2024-01-10', impressions: 2000, spend: 980000 },
        { date: '2024-01-15', impressions: 2780, spend: 3908000 },
        { date: '2024-01-20', impressions: 1890, spend: 4800000 },
        { date: '2024-01-25', impressions: 2390, spend: 3800000 },
        { date: '2024-01-30', impressions: 3490, spend: 4300000 },
    ].map(item => filterCampaignId ? { ...item, impressions: item.impressions * 0.4, spend: item.spend * 0.4 } : item);

    // Calculate totals based on filtered campaigns
    const totalSpend = filteredCampaigns.reduce((acc, curr) => acc + (curr.spend || 0), 0);
    // If filtering, calculate impressions from deliverables or mock. If generic brand view, use brand total or sum.
    const totalImpressions = filterCampaignId
        ? (totalSpend / 2000) * 1000 // Mock CPM approx 2000
        : (brand.widgets?.impressions?.value || 1200000);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Active Campaign Highlights - Only show when viewing all campaigns */}
            {!filterCampaignId && (
                <div className="flex flex-wrap gap-2">
                    {campaigns.filter(c => c.status === 'Running' || c.status === 'active').map(c => (
                        <Card key={c.id} className="bg-white p-6 border-l-4 border-l-slate-900 w-full mb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold mb-2 text-slate-900">{c.name}</h2>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline" className="flex items-center gap-1">
                                            {c.serviceType || 'Campaign'}
                                        </Badge>
                                    </div>
                                </div>
                                <Badge className="bg-green-100 text-green-800 border-green-200 border capitalize">
                                    {c.status}
                                </Badge>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900">
                    <DollarSign className="h-5 w-5 text-slate-500" /> Financial Performance
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-white border-slate-200">
                        <p className="text-sm text-slate-500">Total Spend</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900">{formatCurrency(totalSpend)}</h3>
                    </Card>
                    <Card className="p-4 bg-white border-slate-200">
                        <p className="text-sm text-slate-500">Total Impressions</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900">{(totalImpressions / 1000).toFixed(1)}k</h3>
                    </Card>
                    <Card className="p-4 bg-white border-slate-200">
                        <p className="text-sm text-slate-500">CPM</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900">{totalImpressions > 0 ? formatCurrency((totalSpend / totalImpressions) * 1000) : 0}</h3>
                    </Card>
                </div>
            </section>

            <Card className="p-6 bg-white border-slate-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg text-slate-900">Performance Trend</h3>
                    <div className="relative">
                        <select
                            className="flex h-8 w-full items-center justify-between rounded-md border border-slate-200 bg-transparent px-2 py-1 text-xs shadow-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        >
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="ytd">Year to Date</option>
                        </select>
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#0f172a' }}
                            />
                            <Line type="monotone" dataKey="impressions" stroke="#0f172a" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="spend" stroke="#E1306C" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-900">
                        <ImageIcon className="h-5 w-5 text-slate-500" />
                        Creative Gallery
                    </h2>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                            <Filter className="h-3 w-3 mr-2" /> Filter
                        </Button>
                        <Button size="sm" className="h-8 text-xs bg-slate-900 text-white hover:bg-slate-800">Upload Creative</Button>
                    </div>
                </div>

                {activeDeliverables.length === 0 ? (
                    <div className="p-12 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50">
                        <p className="text-slate-500 text-sm">No configured assets found. Go to 'Data' tab to configure deliverables.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {activeDeliverables.map((item, idx) => {
                            const channel = CHANNELS.find(c => c.id === item.channelId);
                            return (
                                <div key={idx} className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all border border-slate-100 cursor-pointer" onClick={() => setSelectedDeliverable({ deliverable: item, campaignName: item.campaignName })}>
                                    <div className={`relative bg-slate-100 aspect-square`}>
                                        <div className="absolute top-2 right-2 z-10 p-1 bg-white/90 backdrop-blur rounded-full shadow-sm">
                                            <Badge variant="secondary" className={`${channel?.color || 'bg-black'} text-white border-0 text-[8px] h-4 px-1 shadow-md`}>
                                                {channel?.name || item.channelId}
                                            </Badge>
                                        </div>

                                        <img src={item.thumbnailUrl} alt="creative" className="w-full h-full object-cover" />

                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                                            <p className="font-semibold text-xs truncate">{item.campaignName}</p>
                                            <div className="flex justify-between items-end mt-1">
                                                <div>
                                                    <p className="text-[8px] opacity-80 uppercase tracking-wider">Impressions</p>
                                                    <p className="text-sm font-bold leading-none">{(Math.random() * 10000).toFixed(0)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </section>

            <MockupModal
                isOpen={!!selectedDeliverable}
                onClose={() => setSelectedDeliverable(null)}
                channelId={selectedDeliverable?.deliverable.channelId}
                campaignName={selectedDeliverable?.campaignName}
                creativeUrl={selectedDeliverable?.deliverable.thumbnailUrl}
                postUrl={selectedDeliverable?.deliverable.postUrl}
                metrics={selectedDeliverable?.deliverable.metrics}
            />
        </div>
    );
};

