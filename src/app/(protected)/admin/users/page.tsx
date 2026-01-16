'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { Users, UserPlus, ShieldCheck } from 'lucide-react';

export default function AdminUsersPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                icon={Users}
                category="Access Control"
                title="User Management"
                description="Manage team member access, roles, and administrative permissions."
                actions={
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all shadow-sm">
                            <ShieldCheck className="h-4 w-4" /> PERMISSION MATRIX
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                            <UserPlus className="h-4 w-4" /> INVITE MEMBER
                        </button>
                    </div>
                }
            />

            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b bg-slate-50/50">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Active Team Members</h3>
                </div>
                <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                        <Users className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                        <p className="font-bold text-slate-900">No users found</p>
                        <p className="text-sm text-slate-500 max-w-[250px]">Start by inviting a new team member to your agency workspace.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
