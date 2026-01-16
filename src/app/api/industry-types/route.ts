import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const industries = await (prisma as any).industry.findMany({
            include: {
                subTypes: {
                    orderBy: { name: 'asc' }
                }
            },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(industries);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch industries' }, { status: 500 });
    }
}

