import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // 1. Get all tables
        const tablesRaw: any[] = await prisma.$queryRawUnsafe(
            `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma_migrations';`
        );
        const tableNames = tablesRaw.map(t => t.name);

        const schema: any = {};

        for (const tableName of tableNames) {
            // 2. Get columns
            const columns: any[] = await prisma.$queryRawUnsafe(`PRAGMA table_info("${tableName}");`);

            // 3. Get foreign keys
            const foreignKeys: any[] = await prisma.$queryRawUnsafe(`PRAGMA foreign_key_list("${tableName}");`);

            schema[tableName] = {
                columns: columns.map(c => ({
                    name: c.name,
                    type: c.type,
                    notnull: c.notnull === 1,
                    pk: c.pk === 1,
                    default: c.dflt_value
                })),
                relations: foreignKeys.map(fk => ({
                    toTable: fk.table,
                    fromColumn: fk.from,
                    toColumn: fk.to
                }))
            };
        }

        return NextResponse.json(schema);
    } catch (error) {
        console.error('Failed to fetch schema:', error);
        return NextResponse.json({ error: 'Failed to fetch schema' }, { status: 500 });
    }
}
