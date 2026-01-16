import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json([
        { id: '1', name: 'Reach', slug: 'reach' },
        { id: '2', name: 'Traffic', slug: 'traffic' }
    ]);
}
