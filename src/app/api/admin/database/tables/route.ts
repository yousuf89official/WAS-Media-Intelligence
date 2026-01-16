import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const tables: any[] = await prisma.$queryRawUnsafe(
            `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma_migrations';`
        );
        return NextResponse.json(tables.map(t => t.name));
    } catch (error) {
        console.error('Failed to fetch tables:', error);
        return NextResponse.json({ error: 'Failed to fetch tables' }, { status: 500 });
    }
}
