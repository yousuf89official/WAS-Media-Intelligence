import { useLayout } from '@/contexts/LayoutContext';

interface HeaderProps {
    onAddWidget?: () => void;
}

export const Header = ({ onAddWidget }: HeaderProps) => {
    const { headerContent } = useLayout();

    return (
        <header className="h-[100px] border-b border-gray-100 dark:border-white/5 bg-white/95 dark:bg-background/80 backdrop-blur-xl sticky top-0 z-40 px-6 flex items-center transition-all duration-500 overflow-hidden shadow-sm">
            {headerContent ? (
                <div className="w-full animate-in fade-in slide-in-from-top-2 duration-500">
                    {headerContent}
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">System Active</span>
                    </div>
                </div>
            )}
        </header>
    );
};
