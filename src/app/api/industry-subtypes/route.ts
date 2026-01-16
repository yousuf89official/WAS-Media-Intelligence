import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const industryTypeId = searchParams.get('industryTypeId');

    // Mock logic
    if (industryTypeId === '1') {
        return NextResponse.json([{ id: '11', industryTypeId: '1', name: 'SaaS', slug: 'saas' }]);
    }
    return NextResponse.json([]);
}
