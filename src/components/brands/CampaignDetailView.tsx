import { Campaign, api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, DollarSign, BarChart3, Target, Layers } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CampaignDetailViewProps {
    campaign: Campaign;
    onBack: () => void;
    onEdit: () => void;
}

export const CampaignDetailView = ({ campaign, onBack, onEdit }: CampaignDetailViewProps) => {
    // Mock performance data - replace with actual API later
    const performance = {
        spent: campaign.spend || 0,
        budget: campaign.budgetPlanned || 100000,
        impressions: 1250000,
        clicks: 45000,
        ctr: 3.6,
        roas: 4.2
    };

    const budgetProgress = (performance.spent / performance.budget) * 100;

    return (
        <div className="space-y-6 animate-in slide-in-from-right-10 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-400 hover:text-white">
                        <ArrowLeft size={18} />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold tracking-tight text-white">{campaign.name}</h2>
                            <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                                {campaign.status}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><Target size={12} /> {campaign.objective || 'No Objective'}</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                            <span className="flex items-center gap-1"><Calendar size={12} /> {campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : 'N/A'} - {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'N/A'}</span>
                        </div>
                    </div>
                </div>
                <Button onClick={onEdit} variant="outline" className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10">
                    Edit Campaign
                </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Spend</p>
                                <h3 className="text-2xl font-bold text-white mt-1">
                                    ${performance.spent.toLocaleString()}
                                </h3>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                <DollarSign size={20} />
                            </div>
                        </div>
                        <div className="mt-4 space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Budget Utilization</span>
                                <span>{budgetProgress.toFixed(1)}%</span>
                            </div>
                            <Progress value={budgetProgress} className="h-1.5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Impressions</p>
                                <h3 className="text-2xl font-bold text-white mt-1">
                                    {(performance.impressions / 1000000).toFixed(1)}M
                                </h3>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <BarChart3 size={20} />
                            </div>
                        </div>
                        <p className="text-xs text-green-400 mt-4 flex items-center">
                            ↑ 12% <span className="text-muted-foreground ml-1">vs last period</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">CTR</p>
                                <h3 className="text-2xl font-bold text-white mt-1">
                                    {performance.ctr}%
                                </h3>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                                <Target size={20} />
                            </div>
                        </div>
                        <p className="text-xs text-green-400 mt-4 flex items-center">
                            ↑ 0.4% <span className="text-muted-foreground ml-1">above benchmark</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">ROAS</p>
                                <h3 className="text-2xl font-bold text-white mt-1">
                                    {performance.roas}x
                                </h3>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <DollarSign size={20} />
                            </div>
                        </div>
                        <p className="text-xs text-green-400 mt-4 flex items-center">
                            High Performance
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-white/5 text-muted-foreground">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="creative">Creative Assets</TabsTrigger>
                    <TabsTrigger value="channels">Channels & Config</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Placeholder for Chart */}
                        <Card className="bg-card/50 backdrop-blur-sm border-white/5 h-[300px]">
                            <CardHeader>
                                <CardTitle>Performance Trends</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center text-muted-foreground">
                                Chart Component Here
                            </CardContent>
                        </Card>

                        {/* Recent Activity / Logs */}
                        <Card className="bg-card/50 backdrop-blur-sm border-white/5 h-[300px]">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-start gap-3 text-sm">
                                        <div className="h-2 w-2 mt-1.5 rounded-full bg-indigo-500" />
                                        <div>
                                            <p className="text-white">Campaign budget updated</p>
                                            <p className="text-xs text-muted-foreground">2 hours ago by Admin</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="creative">
                    <Card className="bg-card/50 backdrop-blur-sm border-white/5 p-8 text-center text-muted-foreground">
                        No creative assets linked yet.
                    </Card>
                </TabsContent>

                <TabsContent value="channels">
                    <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-medium text-white mb-4">Target Channels</h3>
                            {/* We could fetch real channels here */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['Instagram', 'TikTok', 'YouTube', 'Meta Ads'].map(c => (
                                    <div key={c} className="p-3 bg-white/5 rounded border border-white/5 text-center text-sm text-gray-300">
                                        {c}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
