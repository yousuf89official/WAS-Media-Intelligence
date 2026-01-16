import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await params;

        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        const shareLink = await prisma.shareLink.findUnique({
            where: { token },
            include: {
                brand: {
                    include: {
                        campaigns: {
                            include: {
                                metrics: true,
                            }
                        }
                    }
                }
            }
        });

        if (!shareLink) {
            return NextResponse.json({ error: 'Invalid or expired link' }, { status: 404 });
        }

        if (!shareLink.isActive) {
            return NextResponse.json({ error: 'This link has been deactivated' }, { status: 403 });
        }

        // Check if expired
        if (shareLink.expiresAt && shareLink.expiresAt < new Date()) {
            return NextResponse.json({ error: 'Link has expired' }, { status: 410 });
        }

        // Aggregate metrics and creatives (mocking creatives for now as in BrandAnalyticsSystem)
        const brand = shareLink.brand;
        const metrics = await prisma.metric.findMany({
            where: { brandId: brand.id },
            orderBy: { date: 'asc' }
        });

        // Construct response similar to what BrandAnalyticsSystem expects
        return NextResponse.json({
            brand: {
                id: brand.id,
                name: brand.name,
                slug: brand.slug,
                logo_url: brand.logo,
                website: brand.website,
                categories: [brand.industryId].filter(Boolean), // Approximation
                brand_color: brand.brandColor,
            },
            campaigns: brand.campaigns,
            metrics: metrics.map(m => ({
                campaign_id: m.campaignId,
                date: m.date.toISOString().split('T')[0],
                impressions: m.impressions,
                clicks: m.clicks,
                reach: m.reach,
                engagements: m.engagement,
                spend: m.spend
            })),
            creatives: [], // You might want to fetch these if they were in the DB
        });

    } catch (error) {
        console.error('Public API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await params;
        const { isActive } = await request.json();

        if (typeof isActive !== 'boolean') {
            return NextResponse.json({ error: 'isActive must be a boolean' }, { status: 400 });
        }

        const shareLink = await prisma.shareLink.update({
            where: { token },
            data: { isActive }
        });

        return NextResponse.json(shareLink);
    } catch (error) {
        console.error('Toggle Share Link Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
