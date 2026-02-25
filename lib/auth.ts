import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'ridona-dev-secret-change-in-production';
const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export type TokenPayload = {
    userId: number;
    email: string;
};

export function createToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
}

export function verifyToken(token: string): TokenPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch {
        return null;
    }
}

/** Extract user id from Authorization header or cookie */
export function getUserFromRequest(req: NextRequest): TokenPayload | null {
    // Try Authorization header first
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
        return verifyToken(authHeader.slice(7));
    }

    // Try cookie
    const tokenCookie = req.cookies.get('ridona-token');
    if (tokenCookie?.value) {
        return verifyToken(tokenCookie.value);
    }

    return null;
}
