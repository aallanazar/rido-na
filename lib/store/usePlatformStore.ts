import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'uz' | 'en' | 'de';
export type Theme = 'light' | 'dark';

interface PlatformState {
    language: Language;
    theme: Theme;
    setLanguage: (lang: Language) => void;
    toggleTheme: () => void;
    // Placeholder for subjects and progress
    progress: Record<string, number>;
    updateProgress: (subjectId: string, value: number) => void;
}

export const usePlatformStore = create<PlatformState>()(
    persist(
        (set) => ({
            language: 'de',
            theme: 'light',
            progress: {},
            setLanguage: (language) => set({ language }),
            toggleTheme: () => set((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light'
            })),
            updateProgress: (subjectId, value) => set((state) => ({
                progress: { ...state.progress, [subjectId]: value }
            })),
        }),
        {
            name: 'ridona-platform-storage',
        }
    )
);
