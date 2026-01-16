'use client';

import { useState, useCallback } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Calculator, Zap, History } from 'lucide-react';
import { CalculatorForm } from '@/components/ave/CalculatorForm';
import { AveResultCard } from '@/components/ave/AveResultCard';
import { toast } from 'sonner';

export default function AveCalculatorPage() {
    const [result, setResult] = useState<any>(null);

    const handleCalculate = useCallback(async (values: any) => {
        // Multipliers based on platform
        const platformMultipliers: Record<string, number> = {
            instagram: 1.2,
            tiktok: 1.5,
            facebook: 1.0,
            linkedin: 1.8
        };

        // Multipliers based on engagement
        const engagementMultipliers: Record<string, number> = {
            low: 0.9,
            moderate: 1.0,
            high: 1.15,
            viral: 1.5
        };

        const platformMult = platformMultipliers[values.platform] || 1.0;
        const engagementMult = engagementMultipliers[values.engagement] || 1.0;

        // Sentiment multiplier: 0 -> 0.5, 50 -> 1.0, 100 -> 1.5
        const sentimentMult = 0.5 + (values.sentiment / 100);

        const baseValue = (values.impressions / 1000) * values.cpm;
        const finalAve = baseValue * platformMult * sentimentMult * engagementMult;

        setResult({
            aveValue: finalAve,
            impressions: values.impressions,
            cpm: values.cpm,
            multipliers: {
                platform: platformMult,
                sentiment: sentimentMult,
                engagement: engagementMult
            }
        });
        toast.success('Media Equivalency calculated successfully');
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                icon={Calculator}
                category="Media Tools"
                title="AVE Calculator"
                description="Determine Ad Value Equivalency by mapping PR impressions and reach against market-weighted variables."
                actions={
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all shadow-sm">
                            <History className="h-4 w-4" /> RECENT CALCULATIONS
                        </button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <CalculatorForm onCalculate={handleCalculate} />
                {result && (
                    <div className="sticky top-6">
                        <AveResultCard {...result} />
                    </div>
                )}
            </div>
        </div>
    );
}
