
import React from 'react';
import { RefreshCcw, Trash2 } from 'lucide-react';
import { BrandAvatar } from './BrandAvatar';
import { Badge, Button } from './BrandPrimitives';
import { EnrichedBrand } from '@/lib/brands-data';

export const ArchiveTable = ({ brands, onRestore, onDelete, onUpdateStatus }: {
    brands: EnrichedBrand[],
    onRestore: (id: string, name: string) => void,
    onDelete: (id: string, name: string, permanent?: boolean) => void,
    onUpdateStatus: (id: string, status: string) => void
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Brand Entity</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Sector</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Archived Date</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                            <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {brands.map((brand) => (
                            <tr key={brand.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <BrandAvatar
                                            logo_url={brand.logo}
                                            name={brand.name}
                                            brand_color={brand.brandColor || undefined}
                                            size="sm"
                                        />
                                        <div>
                                            <div className="font-bold text-slate-900 text-sm">{brand.name}</div>
                                            <div className="text-[10px] text-slate-400 font-mono">{brand.slug}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-700">{brand.industry}</span>
                                        <span className="text-[10px] text-slate-400">{brand.sub_category}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-medium text-slate-500">
                                        {new Date(brand.updatedAt).toLocaleDateString()}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant="inactive">ARCHIVED</Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => onRestore(brand.id, brand.name)}
                                            className="h-8 w-8 p-0"
                                            title="Restore to Active"
                                        >
                                            <RefreshCcw className="h-4 w-4 text-emerald-600" />
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => onDelete(brand.id, brand.name, true)}
                                            className="h-8 w-8 p-0 hover:border-rose-200 hover:bg-rose-50"
                                            title="Delete Permanently"
                                        >
                                            <Trash2 className="h-4 w-4 text-rose-500" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
