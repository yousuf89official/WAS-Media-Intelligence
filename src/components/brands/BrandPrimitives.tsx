
import React, { useState } from 'react';
import { ChevronDown, AlertTriangle, Check, X, Sparkles, Save } from 'lucide-react';

export const Button = ({ children, variant = 'primary', size = 'default', className = '', ...props }: any) => {
    const base = "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95";
    const sizes: any = {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
    };
    // Modern Colorful Variants
    const variants: any = {
        primary: "bg-gradient-to-r bg-brand-primary text-white shadow-md hover:shadow-lg hover:from-violet-700 hover:to-indigo-700 border border-transparent",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
        outline: "border border-brand-primary/30 bg-brand-primary-light/50 text-indigo-700 hover:bg-brand-primary-light",
        ghost: "hover:bg-slate-100 hover:text-brand-primary text-slate-500",
        destructive: "bg-white text-rose-600 border border-rose-200 hover:bg-rose-50",
        ai: "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white hover:from-fuchsia-600 hover:to-pink-600 shadow-md border-transparent",
    };
    return <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

export const Badge = ({ children, variant = 'default', className = '' }: any) => {
    const variants: any = {
        default: "bg-violet-100 text-violet-700 border border-violet-200",
        secondary: "bg-slate-100 text-slate-600 border border-slate-200",
        outline: "text-slate-600 border border-slate-200",
        success: "bg-emerald-100 text-emerald-700 border border-emerald-200",
        inactive: "bg-slate-100 text-slate-400 border border-slate-200",
        ai: "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-brand-primary/20",
    };
    return <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide transition-colors ${variants[variant]} ${className}`}>{children}</div>;
};

export const Card = ({ children, className = '' }: any) => (
    <div className={`rounded-2xl border border-white/50 bg-white/90 backdrop-blur-sm text-slate-900 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>{children}</div>
);

export const Input = (props: any) => (
    <input className="flex h-9 w-full rounded-lg border border-slate-200 bg-white/50 px-3 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white" {...props} />
);

export const Label = ({ children, className = '' }: any) => (
    <label className={`text-[10px] uppercase tracking-wider font-bold text-slate-500 leading-none ${className}`}>{children}</label>
);

export const SelectWrapper = ({ children, className = "", ...props }: any) => (
    <div className="relative">
        <select
            className={`flex h-9 w-full items-center justify-between rounded-lg border border-slate-200 bg-white/50 px-2 py-1 text-xs shadow-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50 appearance-none hover:bg-white transition-colors ${className}`}
            {...props}
        >
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <ChevronDown className="h-3 w-3" />
        </div>
    </div>
);

export const AlertDialog = ({ isOpen, title, description, onConfirm, onCancel }: any) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 transform scale-100">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-rose-50 flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-rose-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                </div>
                <div className="bg-slate-50/50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100">
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button variant="destructive" onClick={onConfirm}>Delete</Button>
                </div>
            </div>
        </div>
    );
};

export const PremiumModal = ({ isOpen, title, message, details, type = 'info', onConfirm }: any) => {
    const [copied, setCopied] = useState(false);
    if (!isOpen) return null;

    const copyToClipboard = () => {
        const textToCopy = details || message;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getIcon = () => {
        switch (type) {
            case 'success': return <Check className="h-6 w-6 text-emerald-500" />;
            case 'warning': return <AlertTriangle className="h-6 w-6 text-amber-500" />;
            case 'error': return <X className="h-6 w-6 text-rose-500" />;
            default: return <Sparkles className="h-6 w-6 text-indigo-500" />;
        }
    };

    const getIconBg = () => {
        switch (type) {
            case 'success': return 'bg-emerald-50';
            case 'warning': return 'bg-amber-50';
            case 'error': return 'bg-rose-50';
            default: return 'bg-brand-primary-light';
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[32px] shadow-2xl max-w-sm w-full overflow-hidden border border-white/20 transform animate-in zoom-in-95 duration-300">
                <div className="p-8 text-center">
                    <div className={`h-16 w-16 rounded-2xl ${getIconBg()} flex items-center justify-center mx-auto mb-6 shadow-sm`}>
                        {getIcon()}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">{title}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{message}</p>

                    {details && (
                        <div className="mt-6 text-left">
                            <Label className="text-[9px] mb-2 block">Technical Logs</Label>
                            <div className="relative group">
                                <pre className="bg-slate-900 text-slate-300 p-4 rounded-xl text-[10px] overflow-x-auto font-mono max-h-40 border border-slate-800">
                                    {details}
                                </pre>
                                <button
                                    onClick={copyToClipboard}
                                    className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all border border-slate-700"
                                    title="Copy to clipboard"
                                >
                                    {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Save className="h-3 w-3" />}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100">
                    <button
                        onClick={onConfirm}
                        className="w-full py-4 bg-brand-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-brand-primary/20"
                    >
                        Acknowledged
                    </button>
                </div>
            </div>
        </div>
    );
};
