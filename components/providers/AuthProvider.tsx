'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { usePlatformStore } from '@/lib/store/usePlatformStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { checkAuth, user, token } = useAuthStore();
    const { syncFromServer } = usePlatformStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // Sync from server when user logs in
    useEffect(() => {
        if (user && token) {
            syncFromServer(token);
        }
    }, [user, token, syncFromServer]);

    return <>{children}</>;
}
