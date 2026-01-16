import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json([
        { id: '1', name: 'US Market', code: 'US', currency: 'USD', region: 'North America' },
        { id: '2', name: 'UK Market', code: 'UK', currency: 'GBP', region: 'Europe' }
    ]);
}
