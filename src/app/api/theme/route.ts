import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/theme
export async function GET() {
    try {
        // Bypass stale prisma client model check with queryRaw
        const results: any[] = await prisma.$queryRawUnsafe(
            `SELECT value FROM AppConfig WHERE key = 'theme:default-theme' LIMIT 1;`
        );

        if (!results || results.length === 0) {
            return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
        }

        let colors = results[0].value;
        try {
            colors = JSON.parse(colors);
        } catch (e: any) { }

        return NextResponse.json(colors);
    } catch (error: any) {
        console.error('Theme API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    }
}

// PUT /api/theme
export async function PUT(request: Request) {
    try {
        const colors = await request.json();
        const value = JSON.stringify(colors);

        // Raw SQL implementation for upsert to bypass stale client
        await prisma.$executeRawUnsafe(
            `INSERT INTO AppConfig (key, value, updatedAt) 
             VALUES ('theme:default-theme', ?, CURRENT_TIMESTAMP)
             ON CONFLICT(key) DO UPDATE SET value = excluded.value, updatedAt = CURRENT_TIMESTAMP;`,
            value
        );

        return NextResponse.json(colors);
    } catch (error: any) {
        console.error('Theme API PUT Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    }
}
