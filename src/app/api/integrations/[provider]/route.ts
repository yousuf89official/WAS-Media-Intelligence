import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/integrations/[provider]
export async function GET(
    request: Request,
    { params }: { params: Promise<{ provider: string }> }
) {
    const { provider } = await params;
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brandId');

    if (!brandId) {
        return NextResponse.json({ error: 'Missing brandId' }, { status: 400 });
    }

    try {
        // Query Prisma for integrations of this provider for the given brand
        const integrations = await prisma.integration.findMany({
            where: {
                brandId,
                provider: provider
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        // Map database rows to the structure expected by the frontend
        const accounts = integrations
            .filter(i => i.customerId) // Only count accounts that have a customerId/AccountID
            .map(i => ({
                id: i.id,
                customerId: i.customerId,
                accountName: i.accountName || i.customerId,
                updatedAt: i.updatedAt
            }));

        // A "pending" integration is one where we've started the connection but haven't selected an account yet
        const hasPending = integrations.some(i => !i.customerId);

        return NextResponse.json({
            connected: accounts.length > 0,
            hasPending,
            accounts
        });
    } catch (error: any) {
        console.error(`[Integrations] Error fetching status for ${provider}:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
