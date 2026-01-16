import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

// GET /api/platforms
export async function GET() {
    try {
        const platforms = await prisma.platform.findMany();
        return NextResponse.json(platforms);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST /api/platforms
export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');

        const platform = await prisma.platform.create({
            data: {
                name,
                slug,
            }
        });
        return NextResponse.json(platform);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
