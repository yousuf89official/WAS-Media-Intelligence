import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const CampaignProgress = ({ current, target }: { current: number; target: number }) => {
    const percentage = Math.min((current / target) * 100, 100);

    return (
        <Card className="bg-card/50 backdrop-blur-sm border-white/5 h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Campaign Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                    <span>{current.toLocaleString()}</span>
                    <span className="text-muted-foreground">/ {target.toLocaleString()}</span>
                </div>
                <Progress value={percentage} className="h-3 bg-white/10" indicatorClassName="bg-green-500" />
                <div className="text-center text-xs text-muted-foreground">
                    {percentage.toFixed(1)}% Complete
                </div>
            </CardContent>
        </Card>
    );
};
