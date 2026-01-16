import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../index.css';
import Providers from './providers';

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
    title: 'WAS Media Hub | Master Your Global Narrative',
    description: 'Empower your brand with 360-degree marketing insights.',
};

import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body className={`${poppins.className} bg-background-light font-display text-slate-900 selection:bg-primary/30`}>
                <Providers>
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
