'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { usePlatformStore } from '@/lib/store/usePlatformStore';
import { useTranslation } from '@/lib/hooks/useTranslation';
import {
    BookOpen, Code, Trophy, ArrowRight, Calculator,
    Atom, Beaker, Microscope, FileSpreadsheet, Monitor,
    GraduationCap, TrendingUp, Clock,
} from 'lucide-react';

const COURSES = [
    { id: 'python', name: 'Python', modules: 15, icon: Code, color: '#3776AB' },
    { id: 'javascript', name: 'JavaScript', modules: 15, icon: Code, color: '#F7DF1E' },
    { id: 'typescript', name: 'TypeScript', modules: 15, icon: Code, color: '#3178C6' },
    { id: 'css', name: 'CSS', modules: 15, icon: Code, color: '#1572B6' },
    { id: 'react', name: 'React', modules: 15, icon: Code, color: '#61DAFB' },
    { id: 'java', name: 'Java', modules: 15, icon: Code, color: '#ED8B00' },
    { id: 'go', name: 'Go', modules: 15, icon: Code, color: '#00ADD8' },
    { id: 'sql', name: 'SQL', modules: 15, icon: Code, color: '#4479A1' },
];

const SUBJECTS = [
    { id: 'math', name: 'Mathematik', icon: Calculator },
    { id: 'physics', name: 'Physik', icon: Atom },
    { id: 'chemistry', name: 'Chemie', icon: Beaker },
    { id: 'biology', name: 'Biologie', icon: Microscope },
    { id: 'it', name: 'Informatik', icon: Monitor },
    { id: 'office', name: 'Microsoft Office', icon: FileSpreadsheet },
];

export default function DashboardPage() {
    const { user } = useAuthStore();
    const progress = usePlatformStore((s) => s.progress);
    const quiz = usePlatformStore((s) => s.quiz);
    const router = useRouter();
    const { t } = useTranslation();

    // Calculate overall stats
    const stats = useMemo(() => {
        const completedModules = Object.entries(progress).filter(([k, v]) =>
            k.startsWith('courseModule:') && v >= 100
        ).length;

        const quizzesPassed = Object.entries(quiz).filter(([, v]) =>
            typeof v.score === 'number' && v.score >= 7
        ).length;

        const totalProgress = Object.values(progress);
        const avgProgress = totalProgress.length > 0
            ? Math.round(totalProgress.reduce((a, b) => a + b, 0) / totalProgress.length)
            : 0;

        return { completedModules, quizzesPassed, avgProgress };
    }, [progress, quiz]);

    // Get progress per coding course
    const courseProgress = useMemo(() => {
        return COURSES.map((course) => {
            let completed = 0;
            for (let i = 1; i <= course.modules; i++) {
                const key = `courseModule:coding:${course.id}:${i}`;
                if (progress[key] && progress[key] >= 100) completed++;
            }
            return { ...course, completed, pct: Math.round((completed / course.modules) * 100) };
        });
    }, [progress]);

    if (!user) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-28 flex flex-col items-center justify-center min-h-[60vh] gap-6">
                    <GraduationCap size={64} className="text-[#d4a373]" />
                    <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
                    <p className="text-muted-foreground text-lg">Melde dich an, um deinen Fortschritt zu sehen.</p>
                    <Link
                        href="/login"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4a373] to-[#c9935f] text-white font-semibold"
                    >
                        Anmelden
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16">
                {/* Header */}
                <header className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
                        Willkommen, {user.name}! 👋
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Hier ist dein Lernfortschritt auf einen Blick.
                    </p>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#d4a373]/10 to-[#c9935f]/5 border border-[#d4a373]/20">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-[#d4a373]/20 flex items-center justify-center">
                                <BookOpen size={20} className="text-[#d4a373]" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">Abgeschlossene Module</span>
                        </div>
                        <span className="text-4xl font-bold">{stats.completedModules}</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                <Trophy size={20} className="text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">Quizze bestanden</span>
                        </div>
                        <span className="text-4xl font-bold">{stats.quizzesPassed}</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                <TrendingUp size={20} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">Durchschnitt</span>
                        </div>
                        <span className="text-4xl font-bold">{stats.avgProgress}%</span>
                    </div>
                </div>

                {/* Coding Courses */}
                <section className="mb-12">
                    <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                        <Code size={24} className="text-[#d4a373]" />
                        Programmierung
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {courseProgress.map((course) => (
                            <button
                                key={course.id}
                                onClick={() => router.push(`/platform/coding/${course.id}`)}
                                className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:shadow-md hover:border-[#d4a373]/30 transition-all text-left group"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: `${course.color}20` }}
                                    >
                                        <course.icon size={20} style={{ color: course.color }} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">{course.name}</h3>
                                        <span className="text-xs text-muted-foreground">{course.completed}/{course.modules} Module</span>
                                    </div>
                                </div>
                                {/* Progress bar */}
                                <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${course.pct}%`,
                                            backgroundColor: course.color,
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-muted-foreground">{course.pct}%</span>
                                    <ArrowRight size={14} className="text-muted-foreground group-hover:text-[#d4a373] transition-colors" />
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Science Subjects */}
                <section>
                    <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                        <GraduationCap size={24} className="text-[#d4a373]" />
                        Naturwissenschaften & IT
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {SUBJECTS.map((subject) => (
                            <button
                                key={subject.id}
                                onClick={() => router.push(`/platform/${subject.id}`)}
                                className="flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:shadow-md hover:border-[#d4a373]/30 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#d4a373]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <subject.icon size={24} className="text-[#d4a373]" />
                                </div>
                                <span className="text-sm font-semibold text-center">{subject.name}</span>
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
