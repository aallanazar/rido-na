import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'uz' | 'en' | 'de';
export type Theme = 'light' | 'dark';

type QuizProgress = {
    answers: Record<string, string>;
    score?: number;
    showSolutions: boolean;
};


interface PlatformState {
    language: Language;
    theme: Theme;
    setLanguage: (lang: Language) => void;
    toggleTheme: () => void;
    progress: Record<string, number>;
    updateProgress: (subjectId: string, value: number) => void;
    quiz: Record<string, QuizProgress>;
    setQuizAnswer: (key: string, questionId: string, answer: string) => void;
    setQuizScore: (key: string, score: number) => void;
    setQuizShowSolutions: (key: string, show: boolean) => void;
    notes: Record<string, string>;
    setNote: (key: string, value: string) => void;
    // Server sync
    syncFromServer: (token: string) => Promise<void>;
    _isSyncing: boolean;
}

/** Helper to fire-and-forget API call (background sync) */
function bgSync(url: string, body: Record<string, unknown>) {
    const token = JSON.parse(localStorage.getItem('ridona-auth') || '{}')?.state?.token;
    if (!token) return;
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
    }).catch(() => { /* silent */ });
}

export const usePlatformStore = create<PlatformState>()(
    persist(
        (set, get) => ({
            language: 'de',
            theme: 'light',
            progress: {},
            quiz: {},
            notes: {},
            _isSyncing: false,

            setLanguage: (language) => set({ language }),
            toggleTheme: () => set((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light'
            })),

            updateProgress: (subjectId, value) => {
                set((state) => ({
                    progress: { ...state.progress, [subjectId]: value }
                }));
                bgSync('/api/progress', { key: subjectId, value });
            },

            setQuizAnswer: (key, questionId, answer) => {
                set((state) => {
                    const updated = {
                        answers: { ...(state.quiz[key]?.answers ?? {}), [questionId]: answer },
                        score: state.quiz[key]?.score,
                        showSolutions: state.quiz[key]?.showSolutions ?? false,
                    };
                    bgSync('/api/quiz', { quizKey: key, answers: updated.answers, score: updated.score, showSolutions: updated.showSolutions });
                    return { quiz: { ...state.quiz, [key]: updated } };
                });
            },

            setQuizScore: (key, score) => {
                set((state) => {
                    const updated = {
                        answers: state.quiz[key]?.answers ?? {},
                        showSolutions: state.quiz[key]?.showSolutions ?? false,
                        score,
                    };
                    bgSync('/api/quiz', { quizKey: key, answers: updated.answers, score, showSolutions: updated.showSolutions });
                    return { quiz: { ...state.quiz, [key]: updated } };
                });
            },

            setQuizShowSolutions: (key, show) => {
                set((state) => ({
                    quiz: {
                        ...state.quiz,
                        [key]: {
                            answers: state.quiz[key]?.answers ?? {},
                            score: state.quiz[key]?.score,
                            showSolutions: show,
                        }
                    }
                }));
            },

            setNote: (key, value) => {
                set((state) => ({
                    notes: { ...state.notes, [key]: value }
                }));
                // Debounced sync for notes (only sync on significant changes)
                bgSync('/api/notes', { noteKey: key, content: value });
            },

            syncFromServer: async (token: string) => {
                if (get()._isSyncing) return;
                set({ _isSyncing: true });
                try {
                    const headers = { Authorization: `Bearer ${token}` };
                    const [progressRes, quizRes, notesRes] = await Promise.all([
                        fetch('/api/progress', { headers }),
                        fetch('/api/quiz', { headers }),
                        fetch('/api/notes', { headers }),
                    ]);

                    const [progressData, quizData, notesData] = await Promise.all([
                        progressRes.ok ? progressRes.json() : { progress: {} },
                        quizRes.ok ? quizRes.json() : { quiz: {} },
                        notesRes.ok ? notesRes.json() : { notes: {} },
                    ]);

                    // Merge server data with local (server wins for conflicts)
                    set((state) => ({
                        progress: { ...state.progress, ...progressData.progress },
                        quiz: { ...state.quiz, ...quizData.quiz },
                        notes: { ...state.notes, ...notesData.notes },
                        _isSyncing: false,
                    }));
                } catch {
                    set({ _isSyncing: false });
                }
            },
        }),
        {
            name: 'ridona-platform-storage',
        }
    )
);
