import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/cms/landing-page
export async function GET() {
    try {
        const results: any[] = await prisma.$queryRawUnsafe(
            `SELECT value FROM AppConfig WHERE key = 'cms:landing-page' LIMIT 1;`
        );

        if (!results || results.length === 0) {
            // Return Default
            return NextResponse.json({
                heroTitle: "Welcome to WAS Media Hub",
                heroSubtitle: "The centralized platform for all your media needs.",
                aboutTitle: "About Us",
                aboutText: "We are a leading media agency...",
                contactEmail: "contact@wasmedia.com",
                services: [
                    { title: "Analytics", desc: "Real-time insights and performance tracking" },
                    { title: "Targeting", desc: "Precision audience segmentation" },
                    { title: "Automation", desc: "Streamlined campaign management" }
                ]
            });
        }

        let content = results[0].value;
        try { content = JSON.parse(content); } catch (e: any) { }

        return NextResponse.json(content);
    } catch (error: any) {
        console.error('CMS API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    }
}

// PUT /api/cms/landing-page
export async function PUT(request: Request) {
    try {
        const content = await request.json();
        const value = JSON.stringify(content);

        await prisma.$executeRawUnsafe(
            `INSERT INTO AppConfig (key, value, updatedAt) 
             VALUES ('cms:landing-page', ?, CURRENT_TIMESTAMP)
             ON CONFLICT(key) DO UPDATE SET value = excluded.value, updatedAt = CURRENT_TIMESTAMP;`,
            value
        );

        return NextResponse.json(content);
    } catch (error: any) {
        console.error('CMS API PUT Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    }
}
