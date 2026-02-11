'use client';

import Link from 'next/link';
import { usePlatformStore, Language } from '@/lib/store/usePlatformStore';
import { Moon, Sun, Languages, MoreVertical, Settings, Github, User } from 'lucide-react';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { useState, useRef, useEffect } from 'react';

export function Navbar() {
    const { theme, toggleTheme, language, setLanguage } = usePlatformStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
            {/* Left: RN Home Link */}
            <Link
                href="/"
                className="flex items-center justify-center w-12 h-12 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full border border-black/5 dark:border-white/10 shadow-sm font-serif font-bold text-xl hover:scale-105 transition-transform"
            >
                RN
            </Link>

            {/* Center: Search */}
            <div className="flex-1 max-w-2xl mx-4">
                <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md px-4 py-3 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm">
                    <GlobalSearch />
                </div>
            </div>

            {/* Right: Settings Menu */}
            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center justify-center w-12 h-12 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full border border-black/5 dark:border-white/10 shadow-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                    <MoreVertical size={20} />
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 top-14 w-64 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-black/5 dark:border-white/10 overflow-hidden p-2 flex flex-col gap-1 backdrop-blur-xl">

                        <div className="px-4 py-3 border-b border-black/5 dark:border-white/5 mb-1">
                            <div className="flex items-center gap-2 font-semibold text-sm opacity-60 mb-1">
                                <Settings size={14} />
                                Einstellungen
                            </div>
                        </div>

                        {/* Language Switcher */}
                        <div className="px-3 py-2">
                            <div className="text-xs font-semibold opacity-50 mb-2 px-1">Sprache / Language</div>
                            <div className="flex gap-1">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => setLanguage(lang.code)}
                                        className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-colors border border-transparent ${language === lang.code
                                            ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                                            : 'hover:bg-black/5 dark:hover:bg-white/5 border-black/5 dark:border-white/5'
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
                            className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium"
                        >
                            <span>Erscheinungsbild</span>
                            {theme === 'light' ? (
                                <div className="flex items-center gap-2 opacity-70">
                                    <span className="text-xs">Light</span>
                                    <Sun size={16} />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 opacity-70">
                                    <span className="text-xs">Dark</span>
                                    <Moon size={16} />
                                </div>
                            )}
                        </button>

                        <div className="h-px bg-black/5 dark:bg-white/5 my-1" />

                        {/* GitHub User Link */}
                        <a
                            href="https://github.com/aallanazar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium group"
                        >
                            <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center group-hover:bg-black/10 dark:group-hover:bg-white/20 transition-colors">
                                <Github size={16} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs opacity-50">GitHub</span>
                                <span className="font-semibold">aallanazar</span>
                            </div>
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
}

