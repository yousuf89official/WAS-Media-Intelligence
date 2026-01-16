'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { History, Search, Filter } from 'lucide-react';

export default function ActivityLogsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                icon={History}
                category="System Audit"
                title="Activity Logs"
                description="Monitor administrative actions, security events, and platform-wide modifications."
                actions={
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all shadow-sm">
                            <Search className="h-4 w-4" /> SEARCH LOGS
                        </button>
                    </div>
                }
            />

            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden min-h-[400px] flex flex-col">
                <div className="p-6 border-b bg-slate-50/50 flex justify-between items-center">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest text-[10px]">Audit Stream</h3>
                    <div className="flex items-center gap-2">
                        <Filter className="h-3 w-3 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">All Events</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                        <History className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                        <p className="font-bold text-slate-900">No events found</p>
                        <p className="text-sm text-slate-500 max-w-[250px]">Administrative actions will appear here in chronological order.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
