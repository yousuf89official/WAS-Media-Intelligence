import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json([
        { id: '1', name: 'Managed Service', slug: 'managed-service' },
        { id: '2', name: 'Self Service', slug: 'self-service' }
    ]);
}
