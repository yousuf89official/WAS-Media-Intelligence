'use client';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, BarChart2, DollarSign } from 'lucide-react';
import type { Brand } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BrandCardProps {
    brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/brands/${brand.slug}`);
    };

    return (
        <Card
            className="group hover:border-primary/50 transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm relative overflow-hidden"
            onClick={handleClick}
        >
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${brand.logo} flex items-center justify-center text-white font-bold shadow-lg`}>
                        {brand.name.substring(0, 1)}
                    </div>
                    <div>
                        <CardTitle className="text-lg font-bold">{brand.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{brand.industry}</p>
                    </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${brand.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                    {brand.status}
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <BarChart2 size={12} /> Campaigns
                        </p>
                        <p className="text-xl font-bold">{brand.campaignCount}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <DollarSign size={12} /> Total Spend
                        </p>
                        <p className="text-xl font-bold">${((brand.totalSpend || 0) / 1000).toFixed(0)}k</p>
                    </div>
                </div>

                <div className="mt-6 flex items-center text-xs text-primary font-medium group-hover:underline">
                    View Dashboard <ArrowUpRight size={14} className="ml-1" />
                </div>
            </CardContent>
        </Card>
    );
}
