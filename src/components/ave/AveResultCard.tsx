import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AveResultCardProps {
    aveValue: number;
    impressions: number;
    cpm: number;
    multipliers: {
        platform: number;
        sentiment: number;
        engagement: number;
    };
}

export const AveResultCard = ({ aveValue, impressions, cpm, multipliers }: AveResultCardProps) => {
    return (
        <Card className="h-full bg-card/50 backdrop-blur-sm border-white/5">
            <CardHeader>
                <CardTitle>Calculation Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-900/20 border border-primary/20">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Estimated Ad Value Equivalent</p>
                    <h2 className="text-5xl font-bold text-white tracking-tight">
                        ${aveValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h2>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold text-sm">Calculation Breakdown</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-muted-foreground">Base Value (Imp * CPM)</div>
                        <div className="text-right font-medium">${((impressions / 1000) * cpm).toFixed(2)}</div>

                        <div className="text-muted-foreground">Platform Multiplier</div>
                        <div className="text-right font-medium text-green-400">x{multipliers.platform}</div>

                        <div className="text-muted-foreground">Sentiment Score</div>
                        <div className="text-right font-medium text-blue-400">x{multipliers.sentiment}</div>

                        <div className="text-muted-foreground">Engagement Boost</div>
                        <div className="text-right font-medium text-purple-400">x{multipliers.engagement}</div>
                    </div>

                    <Separator className="my-2 bg-white/10" />

                    <div className="flex justify-between items-center text-sm pt-2">
                        <span className="text-muted-foreground">Effective CPM</span>
                        <span className="font-bold text-white">${(aveValue / (impressions / 1000)).toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
