'use client';

import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon: LucideIcon;
    description: string;
    color?: 'indigo' | 'emerald' | 'amber' | 'rose';
}

export const ReportCard = ({
    title,
    value,
    change,
    icon: Icon,
    description,
    color = 'indigo'
}: ReportCardProps) => {
    const colorClasses = {
        indigo: 'bg-indigo-50 text-indigo-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600',
        rose: 'bg-rose-50 text-rose-600'
    };

    const isPositive = change !== undefined && change > 0;
    const isNegative = change !== undefined && change < 0;

    return (
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <Icon className="h-24 w-24 -mr-4 -mt-4 rotate-12" />
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-xl", colorClasses[color])}>
                    <Icon className="h-6 w-6" />
                </div>
                {change !== undefined && (
                    <div className={cn(
                        "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black",
                        isPositive ? "bg-emerald-50 text-emerald-600" :
                            isNegative ? "bg-rose-50 text-rose-600" :
                                "bg-slate-50 text-slate-600"
                    )}>
                        {isPositive ? <ArrowUpRight className="h-3 w-3" /> :
                            isNegative ? <ArrowDownRight className="h-3 w-3" /> :
                                <Minus className="h-3 w-3" />}
                        {Math.abs(change)}%
                    </div>
                )}
            </div>

            <div className="space-y-1 relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                    {title}
                </p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </h3>
                </div>
                <p className="text-sm font-medium text-slate-500 max-w-[200px] leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};
