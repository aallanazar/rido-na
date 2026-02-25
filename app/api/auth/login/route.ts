import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { verifyPassword, createToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const user = db.select().from(users).where(eq(users.email, email.toLowerCase())).get();
        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const valid = await verifyPassword(password, user.passwordHash);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const token = createToken({ userId: user.id, email: user.email });

        const response = NextResponse.json({
            user: { id: user.id, email: user.email, name: user.name, language: user.language },
            token,
        });

        response.cookies.set('ridona-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
