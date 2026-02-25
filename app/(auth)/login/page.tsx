'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { usePlatformStore } from '@/lib/store/usePlatformStore';
import { LogIn, Eye, EyeOff, BookOpen } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuthStore();
    const { syncFromServer } = usePlatformStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);
        if (result.ok) {
            const token = useAuthStore.getState().token;
            if (token) await syncFromServer(token);
            router.push('/');
        } else {
            setError(result.error || 'Login fehlgeschlagen');
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfbf7] via-[#f5f0e8] to-[#ede4d4] dark:from-[#1a1a1a] dark:via-[#1e1e1e] dark:to-[#252525] p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4a373] to-[#c9935f] shadow-lg mb-4">
                        <BookOpen size={28} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-foreground">Ridona</h1>
                    <p className="text-sm text-muted-foreground mt-1">Explore, Learn, Create</p>
                </div>

                {/* Card */}
                <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-3xl border border-black/5 dark:border-white/10 shadow-xl p-8">
                    <h2 className="text-2xl font-serif font-bold mb-6 text-center">Anmelden</h2>

                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground/80">E-Mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-[#fdfbf7] dark:bg-white/5 text-foreground focus:outline-none focus:ring-2 focus:ring-[#d4a373]/50 transition-all"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground/80">Passwort</label>
                            <div className="relative">
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-[#fdfbf7] dark:bg-white/5 text-foreground focus:outline-none focus:ring-2 focus:ring-[#d4a373]/50 transition-all pr-12"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#d4a373] to-[#c9935f] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <LogIn size={18} />
                            {loading ? 'Wird geladen...' : 'Anmelden'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Noch kein Konto?{' '}
                            <Link href="/register" className="text-[#d4a373] hover:underline font-medium">
                                Registrieren
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
