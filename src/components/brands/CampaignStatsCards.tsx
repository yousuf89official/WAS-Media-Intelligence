import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, BarChart3, Target, Layers } from "lucide-react";
import type { Campaign } from "@/services/api";

export const CampaignStatsCards = ({ campaigns }: { campaigns: Campaign[] }) => {

    // Calculated Metrics (Mock logic for now, using real aggregates in future)
    const activeCount = campaigns.filter(c => c.status === 'active').length;
    const totalBudget = campaigns.reduce((acc, c) => acc + (c.budgetPlanned || 0), 0);
    const totalSpend = campaigns.reduce((acc, c) => acc + (c.spend || 0), 0);

    // Mock aggregated performance
    const totalImpressions = campaigns.length * 125000;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{activeCount}</h3>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <Layers size={20} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                            <h3 className="text-2xl font-bold text-white mt-1">${(totalBudget / 1000).toFixed(1)}k</h3>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                            <DollarSign size={20} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Spend</p>
                            <h3 className="text-2xl font-bold text-white mt-1">${(totalSpend / 1000).toFixed(1)}k</h3>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                            <BarChart3 size={20} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Avg. ROAS</p>
                            <h3 className="text-2xl font-bold text-white mt-1">3.8x</h3>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <Target size={20} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
