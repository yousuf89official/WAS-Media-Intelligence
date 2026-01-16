import { Play, Eye, TrendingUp, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Creative } from '@/services/api';

export const CreativeGallery = ({ creatives }: { creatives: Creative[] }) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-red-500">
                        <ImageIcon size={18} /> Creative Gallery
                    </h3>
                    <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full">{creatives.length}</span>
                </div>
                <div className="flex gap-2">
                    <Select defaultValue="all-channels">
                        <SelectTrigger className="w-[120px] h-8 text-xs">
                            <SelectValue placeholder="All..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-channels">All Channels</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all-status">
                        <SelectTrigger className="w-[120px] h-8 text-xs">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-status">All</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {creatives.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-white/5 bg-card/50 backdrop-blur-sm group cursor-pointer hover:border-primary/50 transition-all">
                        <div className={`aspect-[9/16] bg-cover bg-center relative`} style={{ backgroundImage: `url(${item.url})` }}>
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                            {/* Platform Icon (Mock) */}
                            <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <span className="text-[10px] font-bold text-white uppercase">{item.platformName?.[0] || 'P'}</span>
                            </div>

                            {/* Center Action */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                    <Play size={20} fill="white" />
                                </div>
                            </div>
                        </div>

                        <CardContent className="p-3 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">{item.platformName} Story</span>
                                {item.isPaid && <span className="text-[10px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded border border-blue-500/20 font-medium">PAID</span>}
                            </div>

                            <div className="flex gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Eye size={12} /> {item.views && item.views >= 1000 ? `${(item.views / 1000).toFixed(1)}k` : item.views || 0}
                                </div>
                                <div className="flex items-center gap-1">
                                    <TrendingUp size={12} /> {item.shares || 0}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
