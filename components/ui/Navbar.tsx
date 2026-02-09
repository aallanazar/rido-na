'use client';

import React from 'react';
import { usePlatformStore, Language } from '@/lib/store/usePlatformStore';
import { Moon, Sun, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
    const { theme, toggleTheme, language, setLanguage } = usePlatformStore();

    const languages: { code: Language; label: string }[] = [
        { code: 'uz', label: 'UZ' },
        { code: 'en', label: 'EN' },
        { code: 'de', label: 'DE' },
    ];

    return (
        <nav className="fixed top-6 right-6 z-50 flex items-center gap-4 bg-white/80 dark:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 dark:border-white/10 shadow-sm">
            <div className="flex items-center gap-2 border-r border-black/10 dark:border-white/10 pr-4">
                <Languages className="w-4 h-4 opacity-50" />
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${language === lang.code
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'hover:bg-black/5 dark:hover:bg-white/5'
                            }`}
                    >
                        {lang.code.toUpperCase()}
                    </button>
                ))}
            </div>

            <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle Theme"
            >
                {theme === 'light' ? (
                    <Moon className="w-5 h-5 text-gray-700" />
                ) : (
                    <Sun className="w-5 h-5 text-yellow-400" />
                )}
            </button>
        </nav>
    );
}
