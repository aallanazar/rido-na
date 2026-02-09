import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'uz' | 'en' | 'de';
export type Theme = 'light' | 'dark';

type QuizProgress = {
    answers: Record<string, string>;
    score?: number;
    showSolutions: boolean;
};

type WorksheetProgress = {
    onlineText?: string;
    uploads: Record<string, string[]>; // worksheetId -> filenames
    teacherFeedback?: string;
};

interface PlatformState {
    language: Language;
    theme: Theme;
    setLanguage: (lang: Language) => void;
    toggleTheme: () => void;
    // Placeholder for subjects and progress
    progress: Record<string, number>;
    updateProgress: (subjectId: string, value: number) => void;
    quiz: Record<string, QuizProgress>;
    setQuizAnswer: (key: string, questionId: string, answer: string) => void;
    setQuizScore: (key: string, score: number) => void;
    setQuizShowSolutions: (key: string, show: boolean) => void;
    worksheets: Record<string, WorksheetProgress>;
    setWorksheetOnlineText: (key: string, text: string) => void;
    addWorksheetUpload: (key: string, worksheetId: string, filename: string) => void;
    setTeacherFeedback: (key: string, feedback: string) => void;
    notes: Record<string, string>;
    setNote: (key: string, value: string) => void;
}

export const usePlatformStore = create<PlatformState>()(
    persist(
        (set) => ({
            language: 'de',
            theme: 'light',
            progress: {},
            quiz: {},
            worksheets: {},
            notes: {},
            setLanguage: (language) => set({ language }),
            toggleTheme: () => set((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light'
            })),
            updateProgress: (subjectId, value) => set((state) => ({
                progress: { ...state.progress, [subjectId]: value }
            })),
            setQuizAnswer: (key, questionId, answer) => set((state) => ({
                quiz: {
                    ...state.quiz,
                    [key]: {
                        answers: { ...(state.quiz[key]?.answers ?? {}), [questionId]: answer },
                        score: state.quiz[key]?.score,
                        showSolutions: state.quiz[key]?.showSolutions ?? false,
                    }
                }
            })),
            setQuizScore: (key, score) => set((state) => ({
                quiz: {
                    ...state.quiz,
                    [key]: {
                        answers: state.quiz[key]?.answers ?? {},
                        showSolutions: state.quiz[key]?.showSolutions ?? false,
                        score,
                    }
                }
            })),
            setQuizShowSolutions: (key, show) => set((state) => ({
                quiz: {
                    ...state.quiz,
                    [key]: {
                        answers: state.quiz[key]?.answers ?? {},
                        score: state.quiz[key]?.score,
                        showSolutions: show,
                    }
                }
            })),
            setWorksheetOnlineText: (key, text) => set((state) => ({
                worksheets: {
                    ...state.worksheets,
                    [key]: {
                        uploads: state.worksheets[key]?.uploads ?? {},
                        teacherFeedback: state.worksheets[key]?.teacherFeedback,
                        onlineText: text,
                    }
                }
            })),
            addWorksheetUpload: (key, worksheetId, filename) => set((state) => ({
                worksheets: {
                    ...state.worksheets,
                    [key]: {
                        onlineText: state.worksheets[key]?.onlineText,
                        teacherFeedback: state.worksheets[key]?.teacherFeedback,
                        uploads: {
                            ...(state.worksheets[key]?.uploads ?? {}),
                            [worksheetId]: [...(state.worksheets[key]?.uploads?.[worksheetId] ?? []), filename],
                        }
                    }
                }
            })),
            setTeacherFeedback: (key, feedback) => set((state) => ({
                worksheets: {
                    ...state.worksheets,
                    [key]: {
                        onlineText: state.worksheets[key]?.onlineText,
                        uploads: state.worksheets[key]?.uploads ?? {},
                        teacherFeedback: feedback,
                    }
                }
            })),
            setNote: (key, value) => set((state) => ({
                notes: { ...state.notes, [key]: value }
            })),
        }),
        {
            name: 'ridona-platform-storage',
        }
    )
);
