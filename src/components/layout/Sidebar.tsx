'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Briefcase,
    Megaphone,
    FileBarChart,
    Settings,
    Users,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Grid,
    Layers,
    Database,
    Calculator,
    User,
    FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const NAV_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Widgets & Cards', icon: Grid, href: '/dashboard/widgets' },
    { label: 'Brands', icon: Briefcase, href: '/brands' },
    { label: 'AVE Calculator', icon: Calculator, href: '/ave-calculator' },
    { label: 'Campaigns', icon: Megaphone, href: '/admin/brand-campaign-settings' },
    { label: 'Reports', icon: FileBarChart, href: '/reports' },
    { label: 'Database', icon: Database, href: '/admin/database' },
    { label: 'Users', icon: Users, href: '/admin/users' },
    { label: 'Create Invoice', icon: FileText, href: '/tools/invoice' },
    { label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export const Sidebar = () => {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    const [collapsed, setCollapsed] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <motion.aside
            initial={{ width: 240 }}
            animate={{ width: collapsed ? 80 : 240 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="h-screen bg-[#1d3557] border-r border-white/10 flex flex-col relative z-50 text-white shadow-xl"
        >
            {/* Logo Section */}
            <div className="h-16 flex items-center px-6 border-b border-white/10 bg-[#162a45]">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="h-8 w-8 bg-[#e63946] rounded-lg flex items-center justify-center shrink-0 shadow-lg">
                        <span className="font-bold text-white text-lg">W</span>
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="font-bold text-lg tracking-tight whitespace-nowrap text-white"
                            >
                                Media Hub
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 bg-[#e63946] text-white p-1 rounded-full shadow-lg hover:bg-[#c1121f] transition-colors border-2 border-[#1d3557]"
            >
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-hide">
                {NAV_ITEMS.map((item) => {
                    const isActive = (pathname || '').startsWith(item.href);
                    // Special handling for dashboard home to avoid matching everything
                    const isExactMatch = item.href === '/dashboard' && pathname === '/dashboard';
                    const isHighlighted = item.href === '/dashboard' ? isExactMatch : isActive;

                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
                                isHighlighted
                                    ? "bg-white/10 text-white font-medium shadow-sm"
                                    : "text-white hover:text-white hover:bg-white/5"
                            )}>
                                {isHighlighted && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute left-0 w-1 h-6 bg-[#e63946] rounded-r-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    />
                                )}
                                <item.icon size={20} className={cn("shrink-0", isHighlighted && "text-[#e63946]")} />
                                {!collapsed && (
                                    <span className="text-sm">{item.label}</span>
                                )}

                                {/* Tooltip for collapsed state */}
                                {collapsed && (
                                    <div className="absolute left-14 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg border border-white/10">
                                        {item.label}
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / User */}
            <div
                className="p-3 border-t border-white/10 bg-[#162a45] relative"
                onMouseEnter={() => setShowProfileMenu(true)}
                onMouseLeave={() => setShowProfileMenu(false)}
            >
                <AnimatePresence>
                    {showProfileMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className={cn(
                                "absolute bottom-full left-3 mb-2 bg-[#1d3557] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100]",
                                collapsed ? "w-[160px]" : "w-[214px]"
                            )}
                        >
                            <div className="p-3 border-b border-white/10 bg-white/5">
                                <p className="text-xs font-bold text-white truncate">{user?.name || 'Guest User'}</p>
                                <p className="text-[10px] text-white/50 truncate">{user?.email || 'N/A'}</p>
                            </div>
                            <div className="p-1.5">
                                <button className="flex items-center gap-3 w-full px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                    <User size={14} /> Profile
                                </button>
                                <button className="flex items-center gap-3 w-full px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                    <Settings size={14} /> Settings
                                </button>
                                <div className="h-px bg-white/10 my-1 mx-2" />
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-3 w-full px-3 py-2 text-xs text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <LogOut size={14} /> Sign Out
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300",
                    showProfileMenu ? "bg-white/10" : ""
                )}>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#e63946] to-rose-400 flex items-center justify-center text-white shrink-0 shadow-lg border-2 border-white/10 ring-2 ring-transparent group-hover:ring-rose-400/30 transition-all">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
                        ) : (
                            <span className="font-bold text-xs">{(user?.name || 'G').charAt(0).toUpperCase()}</span>
                        )}
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate">{user?.name || 'Guest'}</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-black truncate">{user?.role || 'Guest'}</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.aside>
    );
};
