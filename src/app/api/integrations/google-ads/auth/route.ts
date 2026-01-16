import { NextResponse } from 'next/server';
import { GoogleAdsService } from '../../../../../lib/services/googleAdsService';

// GET /api/integrations/google-ads/auth
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brandId');

    if (!brandId) return NextResponse.json({ error: 'Missing brandId' }, { status: 400 });

    try {
        const url = GoogleAdsService.getAuthUrl(brandId);
        return NextResponse.json({ url });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
