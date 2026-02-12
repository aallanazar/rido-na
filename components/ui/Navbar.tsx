'use client';

import Link from 'next/link';
import { usePlatformStore, Language } from '@/lib/store/usePlatformStore';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { Moon, Sun, Languages, MoreVertical, Settings, Github, User } from 'lucide-react';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { useState, useRef, useEffect } from 'react';

export function Navbar() {
    const { theme, toggleTheme, language, setLanguage } = usePlatformStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    const languages: { code: Language; label: string }[] = [
        { code: 'uz', label: 'UZ' },
        { code: 'en', label: 'EN' },
        { code: 'de', label: 'DE' },
    ];

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-gradient-to-b from-[var(--color-paper-light)] to-[var(--color-paper-light)]/95 dark:from-[var(--color-paper-dark)] dark:to-[var(--color-paper-dark)]/95 backdrop-blur-md border-b border-black/5 dark:border-white/10 shadow-sm">
            {/* Left: RN Home Link */}
            <Link
                href="/"
                className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary)] dark:from-[var(--color-primary)] dark:to-[var(--color-primary-dark)] rounded-full border border-[var(--color-primary)]/20 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 font-serif font-bold text-lg text-white"
            >
                RN
            </Link>

            {/* Center: Search */}
            <div className="flex-1 max-w-2xl mx-4">
                <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md px-4 py-3 rounded-full border border-[var(--color-primary)]/10 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <GlobalSearch />
                </div>
            </div>

            {/* Right: Settings Menu */}
            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center justify-center w-12 h-12 bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-full border border-[var(--color-primary)]/10 dark:border-white/10 shadow-sm hover:shadow-md hover:bg-[var(--color-primary)]/10 dark:hover:bg-white/10 transition-all duration-200 text-[var(--color-primary)] dark:text-[var(--color-primary-light)]"
                >
                    <MoreVertical size={20} />
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 top-14 w-72 bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-lg border border-black/5 dark:border-white/10 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Header Section */}
                        <div className="px-6 py-4 bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 dark:from-[var(--color-primary)]/10 dark:to-[var(--color-secondary)]/10 border-b border-black/5 dark:border-white/5">
                            <div className="flex items-center gap-2 font-semibold text-sm text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                                <Settings size={14} />
                                {t('ui.settings')}
                            </div>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Language Switcher */}
                            <div>
                                <div className="text-xs font-semibold opacity-60 mb-3 px-1 uppercase tracking-wide">{t('ui.languageLabel')}</div>
                                <div className="flex gap-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => setLanguage(lang.code)}
                                            className={`flex-1 text-xs font-bold py-2.5 rounded-lg transition-all duration-200 border ${language === lang.code
                                                ? 'bg-[var(--color-primary)] text-white dark:bg-[var(--color-primary-light)] dark:text-black shadow-md'
                                                : 'bg-white/50 dark:bg-white/5 border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/10 dark:hover:bg-white/10'
                                                }`}
                                        >
                                            {lang.code.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-[var(--color-primary)]/10 dark:hover:bg-white/10 transition-all duration-200 text-sm font-medium border border-black/5 dark:border-white/5"
                            >
                                <span>{t('ui.appearance')}</span>
                                {theme === 'light' ? (
                                    <div className="flex items-center gap-2 opacity-70">
                                        <span className="text-xs">Light</span>
                                        <Sun size={16} className="text-[var(--color-warning)]" />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 opacity-70">
                                        <span className="text-xs">Dark</span>
                                        <Moon size={16} className="text-[var(--color-info)]" />
                                    </div>
                                )}
                            </button>

                            {/* GitHub User Link */}
                            <a
                                href="https://github.com/aallanazar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-[var(--color-secondary)]/10 dark:hover:bg-white/10 transition-all duration-200 text-sm font-medium group border border-black/5 dark:border-white/5"
                            >
                                <div className="w-8 h-8 rounded-full bg-[var(--color-secondary)]/10 dark:bg-[var(--color-secondary)]/20 flex items-center justify-center group-hover:bg-[var(--color-secondary)]/20 dark:group-hover:bg-[var(--color-secondary)]/30 transition-all duration-200">
                                    <Github size={16} className="text-[var(--color-secondary)]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs opacity-60">GitHub</span>
                                    <span className="font-bold text-[var(--color-primary)]">aallanazar</span>
                                </div>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

