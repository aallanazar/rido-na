import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { progress } from '@/lib/db/schema';
import { getUserFromRequest } from '@/lib/auth';
import { eq, and } from 'drizzle-orm';

/** GET all progress for current user */
export async function GET(req: NextRequest) {
    const payload = getUserFromRequest(req);
    if (!payload) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const rows = db.select().from(progress).where(eq(progress.userId, payload.userId)).all();
    const map: Record<string, number> = {};
    for (const r of rows) {
        map[r.key] = r.value;
    }

    return NextResponse.json({ progress: map });
}

/** POST save/update progress */
export async function POST(req: NextRequest) {
    const payload = getUserFromRequest(req);
    if (!payload) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { key, value } = await req.json();
    if (!key || typeof value !== 'number') {
        return NextResponse.json({ error: 'key and value are required' }, { status: 400 });
    }

    const existing = db.select().from(progress)
        .where(and(eq(progress.userId, payload.userId), eq(progress.key, key)))
        .get();

    if (existing) {
        db.update(progress)
            .set({ value, updatedAt: new Date().toISOString() })
            .where(eq(progress.id, existing.id))
            .run();
    } else {
        db.insert(progress).values({
            userId: payload.userId,
            key,
            value,
            updatedAt: new Date().toISOString(),
        }).run();
    }

    return NextResponse.json({ ok: true });
}
