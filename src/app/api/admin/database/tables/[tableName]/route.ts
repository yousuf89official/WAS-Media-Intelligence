import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ tableName: string }> }
) {
    const { tableName } = await params;
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const q = searchParams.get('q') || '';
    const offset = (page - 1) * limit;

    try {
        // Basic SQL injection protection: check if table exists
        const tablesRaw: any[] = await prisma.$queryRawUnsafe(
            `SELECT name FROM sqlite_master WHERE type='table' AND name = ?;`,
            tableName
        );

        if (tablesRaw.length === 0) {
            return NextResponse.json({ error: 'Table not found' }, { status: 404 });
        }

        // Get columns to build search query
        const columnsRaw: any[] = await prisma.$queryRawUnsafe(`PRAGMA table_info("${tableName}");`);
        const columns = columnsRaw.map(c => c.name);

        let data: any[];
        let total: number;

        if (q && columns.length > 0) {
            const searchConditions = columns.map(col => `"${col}" LIKE ?`).join(' OR ');
            const searchValues = columns.map(() => `%${q}%`);

            data = await prisma.$queryRawUnsafe(
                `SELECT * FROM "${tableName}" WHERE ${searchConditions} LIMIT ? OFFSET ?;`,
                ...searchValues,
                limit,
                offset
            );

            const countRaw: any[] = await prisma.$queryRawUnsafe(
                `SELECT COUNT(*) as count FROM "${tableName}" WHERE ${searchConditions};`,
                ...searchValues
            );
            total = Number(countRaw[0].count);
        } else {
            data = await prisma.$queryRawUnsafe(
                `SELECT * FROM "${tableName}" LIMIT ? OFFSET ?;`,
                limit,
                offset
            );

            const countRaw: any[] = await prisma.$queryRawUnsafe(
                `SELECT COUNT(*) as count FROM "${tableName}";`
            );
            total = Number(countRaw[0].count);
        }

        return NextResponse.json({
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        console.error(`Failed to fetch data for table ${tableName}:`, error);
        return NextResponse.json({
            error: 'Failed to fetch data',
            details: error?.message || 'Unknown error',
            tableName
        }, { status: 500 });
    }
}
