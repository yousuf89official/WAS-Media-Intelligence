'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
    icon: LucideIcon;
    category: string;
    title: string;
    description: string;
    actions?: React.ReactNode;
    tabs?: React.ReactNode;
}

export const PageHeader = ({
    icon: Icon,
    category,
    title,
    description,
    actions,
    tabs
}: PageHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-600">
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-black uppercase tracking-widest">{category}</span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 uppercase">{title}</h1>
                <p className="text-slate-500 font-medium">{description}</p>
            </div>
            <div className="flex items-center gap-3">
                {tabs && (
                    <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                        {tabs}
                    </div>
                )}
                {actions}
            </div>
        </div>
    );
};
