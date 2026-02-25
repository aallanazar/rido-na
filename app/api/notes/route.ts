import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { notes } from '@/lib/db/schema';
import { getUserFromRequest } from '@/lib/auth';
import { eq, and } from 'drizzle-orm';

/** GET all notes for current user */
export async function GET(req: NextRequest) {
    const payload = getUserFromRequest(req);
    if (!payload) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const rows = db.select().from(notes).where(eq(notes.userId, payload.userId)).all();
    const map: Record<string, string> = {};
    for (const r of rows) {
        map[r.noteKey] = r.content;
    }

    return NextResponse.json({ notes: map });
}

/** POST save/update a note */
export async function POST(req: NextRequest) {
    const payload = getUserFromRequest(req);
    if (!payload) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { noteKey, content } = await req.json();
    if (!noteKey) {
        return NextResponse.json({ error: 'noteKey is required' }, { status: 400 });
    }

    const existing = db.select().from(notes)
        .where(and(eq(notes.userId, payload.userId), eq(notes.noteKey, noteKey)))
        .get();

    if (existing) {
        db.update(notes)
            .set({ content: content ?? '', updatedAt: new Date().toISOString() })
            .where(eq(notes.id, existing.id))
            .run();
    } else {
        db.insert(notes).values({
            userId: payload.userId,
            noteKey,
            content: content ?? '',
            updatedAt: new Date().toISOString(),
        }).run();
    }

    return NextResponse.json({ ok: true });
}
