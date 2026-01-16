import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Video, Users, FileText, Briefcase, CreditCard } from 'lucide-react';
import type { BrandFinancials } from '@/services/api';

export const FinancialOverview = ({ data }: { data: BrandFinancials }) => {
    const formatCurrency = (val: number) => `Rp ${(val * 15000).toLocaleString('id-ID')}`; // Mock conversion to IDR

    const metrics = [
        { label: 'Total Media Spend', value: formatCurrency(data.totalMediaSpend), sub: `$${data.totalMediaSpend.toLocaleString()}`, icon: DollarSign, color: 'text-blue-500', border: 'border-blue-500/50' },
        { label: 'Channel Spend', value: formatCurrency(data.channelSpend), icon: Video, color: 'text-green-500', border: 'border-green-500/50' },
        { label: 'KOL Spend', value: formatCurrency(data.kolSpend), icon: Users, color: 'text-purple-500', border: 'border-purple-500/50' },
        { label: 'Content Spend', value: formatCurrency(data.contentSpend), icon: FileText, color: 'text-orange-500', border: 'border-orange-500/50' },
        { label: 'Base Cost', value: formatCurrency(data.baseCost), icon: Briefcase, color: 'text-slate-400', border: 'border-slate-500/50' },
        { label: 'Margin', value: formatCurrency(data.totalMediaSpend * (data.margin / 100)), sub: `${data.margin}% markup`, icon: CreditCard, color: 'text-red-500', border: 'border-red-500/50' },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-red-500">
                <span className="font-bold">$</span> Financial Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {metrics.map((item, idx) => (
                    <Card key={idx} className={`bg-card/50 backdrop-blur-sm border-l-4 ${item.border} border-t-white/5 border-r-white/5 border-b-white/5`}>
                        <CardContent className="p-4 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                                <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                                <div className={`p-1.5 rounded-md bg-white/5 ${item.color}`}>
                                    <item.icon size={14} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-lg font-bold truncate">{item.value}</p>
                                {item.sub && <p className="text-xs text-muted-foreground">{item.sub}</p>}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
