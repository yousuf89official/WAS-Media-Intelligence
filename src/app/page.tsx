'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background-light font-display text-slate-900 selection:bg-primary/30">
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 w-full z-50 glass-nav">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="bg-primary p-1.5 rounded-lg transform group-hover:rotate-12 transition-transform duration-300">
                            <svg className="size-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-primary">WAS Media Hub</h1>
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        <Link className="text-sm font-medium hover:text-primary transition-colors text-slate-600" href="#">Product</Link>
                        <Link className="text-sm font-medium hover:text-primary transition-colors text-slate-600" href="#">Solutions</Link>
                        <Link className="text-sm font-medium hover:text-primary transition-colors text-slate-600" href="#">About</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="hidden sm:block px-5 py-2 text-sm font-bold border border-border-dark text-primary rounded-lg hover:bg-primary/5 transition-colors">
                            Contact Sales
                        </button>
                        <Link href="/auth">
                            <button className="bg-primary px-6 py-2.5 rounded-lg text-sm font-bold text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative pt-20 overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 data-grid-bg opacity-30 pointer-events-none"></div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-full hero-gradient pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Now Powered by Creative Intelligence
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                        Master Your Global <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-slate-900">Narrative</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-light leading-relaxed mb-12">
                        Empower your brand with 360-degree marketing insights. Real-time data, global reach, and creative intelligence unified in one dashboard.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2">
                            Book a Demo
                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                        </button>
                        <Link href="/auth">
                            <button className="w-full sm:w-auto px-8 py-4 border border-border-dark bg-white text-primary font-bold rounded-xl hover:bg-slate-50 transition-all">
                                Login to Dashboard
                            </button>
                        </Link>
                    </div>

                    {/* Mockup / Visual Area */}
                    <div className="relative max-w-5xl mx-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-slate-400/20 rounded-2xl blur-xl opacity-40"></div>
                        <div className="relative bg-white border border-border-dark rounded-2xl overflow-hidden shadow-2xl p-4">
                            {/* Dashboard Mockup Placeholder */}
                            <div className="aspect-video w-full bg-slate-50 rounded-xl flex flex-col" data-alt="Modern dashboard interface">
                                {/* Mockup Top Bar */}
                                <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between bg-white">
                                    <div className="flex gap-2">
                                        <div className="size-2.5 rounded-full bg-red-500/80"></div>
                                        <div className="size-2.5 rounded-full bg-amber-500/80"></div>
                                        <div className="size-2.5 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <div className="w-1/3 h-6 bg-gray-100 rounded border border-gray-200"></div>
                                    <div className="size-6 bg-gray-100 rounded-full border border-gray-200"></div>
                                </div>
                                {/* Mockup Body */}
                                <div className="flex-1 p-6 grid grid-cols-12 gap-4">
                                    <div className="col-span-3 space-y-4">
                                        <div className="h-32 bg-primary/5 border border-primary/10 rounded-lg"></div>
                                        <div className="h-48 bg-white border border-gray-200 rounded-lg shadow-sm"></div>
                                    </div>
                                    <div className="col-span-6">
                                        <div className="h-full bg-white border border-gray-200 rounded-lg relative overflow-hidden shadow-sm">
                                            {/* Decorative Map Shape */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                                <span className="material-symbols-outlined text-[120px] text-primary">public</span>
                                            </div>
                                            <div className="absolute top-1/2 left-1/4 size-2 bg-primary rounded-full shadow-[0_0_10px_#e63946]"></div>
                                            <div className="absolute top-1/3 right-1/4 size-2 bg-slate-800 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 space-y-4">
                                        <div className="h-1/2 bg-white border border-gray-200 rounded-lg shadow-sm"></div>
                                        <div className="h-1/2 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                            <div className="h-2 w-full bg-gray-200 rounded mb-2"></div>
                                            <div className="h-2 w-2/3 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-2 w-1/2 bg-primary/40 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Section Header: Trust Bar */}
            <section className="border-y border-border-dark bg-slate-50 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <h4 className="text-slate-500 text-[10px] font-bold tracking-[0.2em] text-center uppercase mb-8">Trusted by Global Innovators</h4>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 text-slate-800">
                        <div className="text-xl font-bold italic tracking-tighter">NIKE</div>
                        <div className="text-xl font-bold tracking-tighter uppercase">Google</div>
                        <div className="text-xl font-bold tracking-tighter">SAMSUNG</div>
                        <div className="text-xl font-bold tracking-tighter">NETFLIX</div>
                        <div className="text-xl font-bold tracking-tighter">Spotify</div>
                    </div>
                </div>
            </section>

            {/* Text Grid: Features */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature 1 */}
                        <div className="group p-8 rounded-2xl border border-gray-200 bg-white hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">public</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Global Reach</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Access data streams from over 140 countries with localized cultural context.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="group p-8 rounded-2xl border border-gray-200 bg-white hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">query_stats</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Real-time Data</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Latency-free monitoring of your brand sentiment as it happens across platforms.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="group p-8 rounded-2xl border border-gray-200 bg-white hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">auto_awesome</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Creative Intel</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">AI-driven creative scoring to predict which visuals will resonate with your audience.</p>
                        </div>
                        {/* Feature 4 */}
                        <div className="group p-8 rounded-2xl border border-gray-200 bg-white hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">dashboard_customize</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Unified Hub</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Consolidate all your social channels and paid media into a single command view.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border-dark bg-slate-50 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                        <div className="max-w-xs">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="size-6 bg-primary rounded flex items-center justify-center">
                                    <svg className="size-4 text-white" fill="none" viewBox="0 0 48 48">
                                        <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                                    </svg>
                                </div>
                                <span className="font-bold text-slate-900">WAS Media Hub</span>
                            </div>
                            <p className="text-slate-500 text-sm">
                                The global social-first agency helping brands master the cultural narrative through intelligence and creativity.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                            <div>
                                <h5 className="text-slate-900 text-sm font-bold mb-4">Platform</h5>
                                <ul className="space-y-3 text-sm text-slate-500">
                                    <li><Link className="hover:text-primary transition-colors" href="#">Dashboard</Link></li>
                                    <li><Link className="hover:text-primary transition-colors" href="#">Global Insights</Link></li>
                                    <li><Link className="hover:text-primary transition-colors" href="#">Reporting</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-slate-900 text-sm font-bold mb-4">Company</h5>
                                <ul className="space-y-3 text-sm text-slate-500">
                                    <li><Link className="hover:text-primary transition-colors" href="#">About Us</Link></li>
                                    <li><Link className="hover:text-primary transition-colors" href="#">Careers</Link></li>
                                    <li><Link className="hover:text-primary transition-colors" href="#">Contact</Link></li>
                                </ul>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <h5 className="text-slate-900 text-sm font-bold mb-4">Support</h5>
                                <ul className="space-y-3 text-sm text-slate-500">
                                    <li><Link className="hover:text-primary transition-colors" href="#">Help Center</Link></li>
                                    <li><Link className="hover:text-primary transition-colors" href="#">API Docs</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-slate-400 text-xs">© 2024 We Are Social Ltd. All rights reserved.</p>
                        <div className="flex gap-6 text-slate-400">
                            <Link className="hover:text-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-xl">share</span>
                            </Link>
                            <Link className="hover:text-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-xl">mail</span>
                            </Link>
                        </div>
                        <div className="flex gap-6 text-xs text-slate-400">
                            <Link className="hover:text-primary transition-colors" href="#">Privacy Policy</Link>
                            <Link className="hover:text-primary transition-colors" href="#">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
