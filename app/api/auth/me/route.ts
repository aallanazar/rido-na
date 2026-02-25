import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { getUserFromRequest } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
    const payload = getUserFromRequest(req);
    if (!payload) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = db.select().from(users).where(eq(users.id, payload.userId)).get();
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
        user: { id: user.id, email: user.email, name: user.name, language: user.language },
    });
}
