import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { homeworkSubmissions } from '@/lib/db/schema';
import { getUserFromRequest } from '@/lib/auth';
import { eq, and } from 'drizzle-orm';

/** GET all homework submissions for current user */
export async function GET(req: NextRequest) {
    const payload = getUserFromRequest(req);
    if (!payload) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const rows = db.select().from(homeworkSubmissions)
        .where(eq(homeworkSubmissions.userId, payload.userId)).all();

    const map: Record<string, string> = {};
    for (const r of rows) {
        map[r.homeworkId] = r.solution;
    }

    return NextResponse.json({ homework: map });
}

/** POST save/update a homework submission */
export async function POST(req: NextRequest) {
    const payload = getUserFromRequest(req);
    if (!payload) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { homeworkId, solution } = await req.json();
    if (!homeworkId) {
        return NextResponse.json({ error: 'homeworkId is required' }, { status: 400 });
    }

    const existing = db.select().from(homeworkSubmissions)
        .where(and(
            eq(homeworkSubmissions.userId, payload.userId),
            eq(homeworkSubmissions.homeworkId, homeworkId)
        ))
        .get();

    if (existing) {
        db.update(homeworkSubmissions)
            .set({ solution: solution ?? '', submittedAt: new Date().toISOString() })
            .where(eq(homeworkSubmissions.id, existing.id))
            .run();
    } else {
        db.insert(homeworkSubmissions).values({
            userId: payload.userId,
            homeworkId,
            solution: solution ?? '',
            submittedAt: new Date().toISOString(),
        }).run();
    }

    return NextResponse.json({ ok: true });
}
