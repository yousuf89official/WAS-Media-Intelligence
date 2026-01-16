import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const serviceTypeId = searchParams.get('serviceTypeId');

    if (serviceTypeId === '1') {
        return NextResponse.json([
            { id: '11', serviceTypeId: '1', name: 'Premium Support', slug: 'premium-support' }
        ]);
    }
    return NextResponse.json([]);
}
