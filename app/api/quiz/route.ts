import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { quizResults } from '@/lib/db/schema';
import { getUserFromRequest } from '@/lib/auth';
import { eq, and } from 'drizzle-orm';

/** GET all quiz results for current user */
export async function GET(req: NextRequest) {
    const payload = getUserFromRequest(req);
    if (!payload) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const rows = db.select().from(quizResults).where(eq(quizResults.userId, payload.userId)).all();
    const map: Record<string, { answers: Record<string, string>; score?: number; showSolutions: boolean }> = {};

    for (const r of rows) {
        map[r.quizKey] = {
            answers: JSON.parse(r.answers),
            score: r.score ?? undefined,
            showSolutions: r.showSolutions === 1,
        };
    }

    return NextResponse.json({ quiz: map });
}

/** POST save/update quiz result */
export async function POST(req: NextRequest) {
    const payload = getUserFromRequest(req);
    if (!payload) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { quizKey, answers, score, showSolutions } = await req.json();
    if (!quizKey) {
        return NextResponse.json({ error: 'quizKey is required' }, { status: 400 });
    }

    const existing = db.select().from(quizResults)
        .where(and(eq(quizResults.userId, payload.userId), eq(quizResults.quizKey, quizKey)))
        .get();

    const data = {
        answers: JSON.stringify(answers ?? {}),
        score: score ?? null,
        showSolutions: showSolutions ? 1 : 0,
        completedAt: new Date().toISOString(),
    };

    if (existing) {
        db.update(quizResults).set(data).where(eq(quizResults.id, existing.id)).run();
    } else {
        db.insert(quizResults).values({
            userId: payload.userId,
            quizKey,
            ...data,
        }).run();
    }

    return NextResponse.json({ ok: true });
}
