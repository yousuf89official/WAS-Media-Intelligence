'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash2, ChevronRight, ChevronDown, Plus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Campaign } from '@/services/api';
import { useState, Fragment } from 'react';

interface CampaignsTableProps {
    data: Campaign[];
    onConfigure: (campaign: Campaign) => void;
    onDelete: (campaignId: string) => void;
    onAddSubCampaign: (parentId: string) => void;
    onSelectCampaign: (campaign: Campaign) => void;
}

export const CampaignsTable = ({ data, onConfigure, onDelete, onAddSubCampaign, onSelectCampaign }: CampaignsTableProps) => {
    // Group campaigns by parent
    const parents = data.filter(c => !c.parentId);
    const getChildren = (parentId: string) => data.filter(c => c.parentId === parentId);

    // Toggle state for expanding rows
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const getStatusBadge = (status: Campaign['status']) => {
        const s = status?.toLowerCase() || 'draft';
        switch (s) {
            case 'active': return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
            case 'paused': return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Paused</Badge>;
            case 'completed': return <Badge variant="secondary" className="bg-slate-100 text-slate-700">Completed</Badge>;
            default: return <Badge variant="outline" className="text-slate-500">Draft</Badge>;
        }
    };

    const BudgetCell = ({ campaign }: { campaign: Campaign }) => {
        const planned = campaign.budgetPlanned || 0;
        const spent = campaign.spend || 0;

        return (
            <div className="flex gap-8 text-sm">
                <div className="space-y-0.5">
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Planned</div>
                    <div className="font-semibold text-slate-900">{planned > 0 ? planned.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }) : '-'}</div>
                </div>
                <div className="space-y-0.5">
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Spent</div>
                    <div className="font-semibold text-slate-900">{spent > 0 ? spent.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }) : '-'}</div>
                </div>
            </div>
        )
    };

    const ProgressCell = ({ campaign }: { campaign: Campaign }) => {
        const planned = campaign.budgetPlanned || 0;
        const spent = campaign.spend || 0;
        const percent = planned > 0 ? Math.min((spent / planned) * 100, 100) : 0;

        return (
            <div className="w-[120px] space-y-2">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">{percent.toFixed(0)}%</span>
                </div>
                <Progress value={percent} className="h-2 bg-slate-100" />
            </div>
        )
    }

    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="border-slate-100 bg-slate-50/50 hover:bg-slate-50/50">
                        <TableHead className="w-[40px]"></TableHead>
                        <TableHead className="w-[300px] text-slate-500 font-semibold">Campaign / Service</TableHead>
                        <TableHead className="text-slate-500 font-semibold">Market</TableHead>
                        <TableHead className="text-slate-500 font-semibold">Objective</TableHead>
                        <TableHead className="text-slate-500 font-semibold">Status</TableHead>
                        <TableHead className="text-slate-500 font-semibold">Budget</TableHead>
                        <TableHead className="text-slate-500 font-semibold">Progress</TableHead>
                        <TableHead className="text-right text-slate-500 font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {parents.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-12 text-slate-400">
                                No campaigns found. Create one to get started.
                            </TableCell>
                        </TableRow>
                    )}

                    {parents.map((parent) => {
                        const children = getChildren(parent.id);
                        const isExpanded = expanded[parent.id];

                        return (
                            <Fragment key={parent.id}>
                                {/* PARENT ROW */}
                                <TableRow
                                    className="border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group"
                                    onClick={() => onSelectCampaign(parent)}
                                >
                                    <TableCell>
                                        {children.length > 0 && (
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400 hover:text-slate-900 hover:bg-slate-200" onClick={(e) => toggleExpand(parent.id, e)}>
                                                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                        {parent.name}
                                    </TableCell>
                                    <TableCell>
                                        {parent.marketCode ? <Badge variant="outline" className="border-slate-200 text-slate-600 bg-white">{parent.marketCode}</Badge> : <span className="text-slate-300">-</span>}
                                    </TableCell>
                                    <TableCell>
                                        {parent.objective ? <span className="text-sm text-slate-700 font-medium">{parent.objective}</span> : <span className="text-slate-300">-</span>}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(parent.status)}</TableCell>
                                    <TableCell>
                                        <BudgetCell campaign={parent} />
                                    </TableCell>
                                    <TableCell>
                                        <ProgressCell campaign={parent} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 bg-indigo-50/50"
                                                onClick={() => onAddSubCampaign(parent.id)}
                                            >
                                                <Plus className="h-3.5 w-3.5 mr-1" /> Sub
                                            </Button>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-900 hover:bg-slate-100">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem onClick={() => onConfigure(parent)}>
                                                        <Pencil className="mr-2 h-4 w-4" /> Edit Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => onDelete(parent.id)} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>

                                {/* CHILD ROWS */}
                                {isExpanded && children.map(child => (
                                    <TableRow
                                        key={child.id}
                                        className="border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 cursor-pointer"
                                        onClick={() => onSelectCampaign(child)}
                                    >
                                        <TableCell></TableCell>
                                        <TableCell className="pl-6 relative">
                                            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-slate-200" />
                                            <div className="flex items-center gap-3">
                                                <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                                </div>
                                                <span className="text-slate-600 font-medium text-sm">{child.serviceType || child.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-slate-500 text-xs font-medium">{child.marketCode || parent.marketCode}</span>
                                        </TableCell>
                                        <TableCell>
                                            {child.objective ? <span className="text-xs text-slate-600 bg-slate-200/50 px-2 py-1 rounded-sm">{child.objective}</span> : <span className="text-slate-300">-</span>}
                                        </TableCell>
                                        <TableCell>{getStatusBadge(child.status)}</TableCell>
                                        <TableCell>
                                            <BudgetCell campaign={child} />
                                        </TableCell>
                                        <TableCell>
                                            <ProgressCell campaign={child} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-7 w-7 p-0 text-slate-400 hover:text-slate-900">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => onConfigure(child)}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit Service
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onDelete(child.id)} className="text-red-500">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </Fragment>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
