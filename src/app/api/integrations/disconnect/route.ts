import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { id } = await request.json();
        const integration = await prisma.integration.delete({
            where: { id }
        });
        return NextResponse.json({ success: true, integration });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to disconnect' }, { status: 500 });
    }
}
