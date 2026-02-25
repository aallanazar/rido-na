import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
    id: number;
    email: string;
    name: string;
    language: string;
};

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;

    login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
    register: (email: string, password: string, name: string) => Promise<{ ok: boolean; error?: string }>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: true,

            login: async (email, password) => {
                try {
                    const res = await fetch('/api/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });
                    const data = await res.json();
                    if (!res.ok) return { ok: false, error: data.error };

                    set({ user: data.user, token: data.token, isLoading: false });
                    return { ok: true };
                } catch {
                    return { ok: false, error: 'Network error' };
                }
            },

            register: async (email, password, name) => {
                try {
                    const res = await fetch('/api/auth/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password, name }),
                    });
                    const data = await res.json();
                    if (!res.ok) return { ok: false, error: data.error };

                    set({ user: data.user, token: data.token, isLoading: false });
                    return { ok: true };
                } catch {
                    return { ok: false, error: 'Network error' };
                }
            },

            logout: async () => {
                await fetch('/api/auth/logout', { method: 'POST' });
                set({ user: null, token: null });
            },

            checkAuth: async () => {
                const { token } = get();
                if (!token) {
                    set({ isLoading: false });
                    return;
                }
                try {
                    const res = await fetch('/api/auth/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (res.ok) {
                        const data = await res.json();
                        set({ user: data.user, isLoading: false });
                    } else {
                        set({ user: null, token: null, isLoading: false });
                    }
                } catch {
                    set({ isLoading: false });
                }
            },

            setUser: (user) => set({ user }),
        }),
        {
            name: 'ridona-auth',
            partialize: (state) => ({ token: state.token, user: state.user }),
        }
    )
);
