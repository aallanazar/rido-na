'use client';

import React, { useEffect } from 'react';
import { usePlatformStore } from '@/lib/store/usePlatformStore';

export function PlatformProvider({ children }: { children: React.ReactNode }) {
    const { theme, language } = usePlatformStore();

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return (
        <div className={`min-h-screen paper-texture ${theme}`}>
            {children}
        </div>
    );
}
