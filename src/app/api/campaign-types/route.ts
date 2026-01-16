import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json([
        { id: '1', typeName: 'Awareness', slug: 'awareness', description: 'Brand Awareness' },
        { id: '2', typeName: 'Conversion', slug: 'conversion', description: 'Drive Conversions' }
    ]);
}
