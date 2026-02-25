'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePlatformStore, Language } from '@/lib/store/usePlatformStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { Moon, Sun, MoreVertical, Settings, Github, LogIn, LogOut, User } from 'lucide-react';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
    const { theme, toggleTheme, language, setLanguage } = usePlatformStore();
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const { t } = useTranslation();

    const languages: { code: Language; label: string }[] = [
        { code: 'uz', label: 'UZ' },
        { code: 'en', label: 'EN' },
        { code: 'de', label: 'DE' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background border-b shadow-sm">
            {/* Left: RN Home Link */}
            <Link href="/">
                <Button
                    variant="default"
                    size="icon"
                    className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                    <span className="font-serif font-bold text-lg">RN</span>
                </Button>
            </Link>

            {/* Center: Search */}
            <div className="flex-1 max-w-2xl mx-4">
                <div className="bg-muted px-4 py-2 rounded-full border shadow-inner hover:bg-muted/80 transition-colors">
                    <GlobalSearch />
                </div>
            </div>

            {/* Right: Settings Menu */}
            <div className="flex items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="w-12 h-12 rounded-full">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-72">
                        <DropdownMenuLabel className="flex items-center gap-2">
                            <Settings size={14} />
                            {t('ui.settings')}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs font-semibold opacity-60 uppercase tracking-wide py-2">
                                {t('ui.languageLabel')}
                            </DropdownMenuLabel>
                            <div className="px-2 pb-2 flex gap-2">
                                {languages.map((lang) => (
                                    <Button
                                        key={lang.code}
                                        onClick={() => setLanguage(lang.code)}
                                        variant={language === lang.code ? 'default' : 'outline'}
                                        size="sm"
                                        className="flex-1 text-xs font-bold"
                                    >
                                        {lang.code.toUpperCase()}
                                    </Button>
                                ))}
                            </div>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={toggleTheme} className="gap-2">
                            <span>{t('ui.appearance')}</span>
                            {theme === 'light' ? (
                                <Sun size={16} className="ml-auto" />
                            ) : (
                                <Moon size={16} className="ml-auto" />
                            )}
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {user ? (
                            <>
                                <DropdownMenuItem className="gap-2">
                                    <User size={16} />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm">{user.name}</span>
                                        <span className="text-xs opacity-60">{user.email}</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={async () => { await logout(); router.push('/login'); }} className="gap-2 text-red-500">
                                    <LogOut size={16} />
                                    <span>Abmelden</span>
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <DropdownMenuItem onClick={() => router.push('/login')} className="gap-2">
                                <LogIn size={16} />
                                <span>Anmelden</span>
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>
                            <a
                                href="https://github.com/aallanazar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3"
                            >
                                <Github size={16} />
                                <div className="flex flex-col">
                                    <span className="text-xs opacity-60">GitHub</span>
                                    <span className="font-bold">aallanazar</span>
                                </div>
                            </a>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}

