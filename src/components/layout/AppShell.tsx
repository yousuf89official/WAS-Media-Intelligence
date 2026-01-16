'use client';

import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { WidgetDrawer } from '../dashboard/WidgetDrawer';
import { useState } from 'react';

interface AppShellProps {
    children: React.ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div className="flex h-screen bg-background overflow-hidden font-sans text-foreground">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Header onAddWidget={() => setDrawerOpen(true)} />
                <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                    {children}
                </main>
            </div>
            <WidgetDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </div>
    );
};
