import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/integrations/google-ads/status
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brandId');
    if (!brandId) return NextResponse.json({ error: 'Missing brandId' }, { status: 400 });

    try {
        const rows = await prisma.integration.findMany({
            where: {
                brandId,
                provider: 'google_ads'
            }
        });
        
        const accounts = rows
            .filter(r => r.customerId)
            .map(r => ({
                id: r.id,
                customerId: r.customerId,
                accountName: r.accountName || r.customerId, 
                updatedAt: r.updatedAt
            }));

        // Check if there's a pending one (no customerId)
        const pending = rows.find(r => !r.customerId);

        return NextResponse.json({
            connected: accounts.length > 0,
            hasPending: !!pending,
            accounts
        });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
