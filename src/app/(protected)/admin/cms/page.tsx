'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { Layers, Plus, FileEdit } from 'lucide-react';

export default function AdminCmsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                icon={Layers}
                category="Platform Content"
                title="Content Management"
                description="Manage public-facing articles, case studies, and static page content."
                actions={
                    <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                        <Plus className="h-4 w-4" /> NEW CONTENT
                    </button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Articles', 'Case Studies', 'Landing Pages'].map((type) => (
                    <div key={type} className="p-8 bg-white border rounded-2xl shadow-sm space-y-4 group hover:border-indigo-300 transition-all">
                        <div className="flex justify-between items-start">
                            <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                <FileEdit className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Active</span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-slate-900">{type}</h3>
                            <p className="text-xs text-slate-500">Manage 0 items in this collection.</p>
                        </div>
                        <button className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                            Configure {type}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
