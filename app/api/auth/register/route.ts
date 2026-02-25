import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { hashPassword, createToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Email, password, and name are required' }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
        }

        // Check if email already exists
        const existing = db.select().from(users).where(eq(users.email, email.toLowerCase())).get();
        if (existing) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
        }

        const passwordHash = await hashPassword(password);

        const result = db.insert(users).values({
            email: email.toLowerCase(),
            passwordHash,
            name,
        }).returning().get();

        const token = createToken({ userId: result.id, email: result.email });

        const response = NextResponse.json({
            user: { id: result.id, email: result.email, name: result.name, language: result.language },
            token,
        });

        response.cookies.set('ridona-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
