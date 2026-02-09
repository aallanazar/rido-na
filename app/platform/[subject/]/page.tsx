'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Star } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';

export default function SubjectPage() {
    const params = useParams();
    const subject = params.subject as string;
    const router = useRouter();
    const { t } = useTranslation();

    const title = subject ? t(`subjects.${subject}`) : 'Subject';

    const modules = [
        { title: 'Einführung', progress: 100 },
        { title: 'Grundlagen', progress: 45 },
        { title: 'Fortgeschrittene Themen', progress: 0 },
    ];

    return (
        <main className="min-h-screen p-8 pt-24 bg-[#fdfbf7] dark:bg-[#1a1a1a] notebook-lines">
            <Navbar />

            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 mb-8 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>{t('ui.backToSelection')}</span>
                </button>

                <header className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-3 py-1 bg-[#d4a373]/20 text-[#d4a373] rounded-full text-xs font-bold uppercase tracking-wider">
                                    {t('ui.modules')} 1
                                </span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} size={14} className={s <= 3 ? "fill-[#d4a373] text-[#d4a373]" : "text-black/10 dark:text-white/10"} />
                                    ))}
                                </div>
                            </div>
                            <h1 className="text-5xl font-serif font-bold">{title}</h1>
                        </div>

                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder={t('ui.searchPlaceholder')}
                                className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#d4a373]/50 transition-colors"
                            />
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="space-y-6">
                        <h2 className="text-2xl font-serif font-bold">{t('ui.modules')}</h2>
                        {modules.map((m, i) => (
                            <div key={i} className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#d4a373]/10 flex items-center justify-center text-[#d4a373]">
                                            <BookOpen size={20} />
                                        </div>
                                        <h3 className="font-bold">{m.title}</h3>
                                    </div>
                                    <span className="text-xs font-medium text-black/40 dark:text-white/40 flex items-center gap-1">
                                        <Clock size={12} /> 15 min
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${m.progress}%` }}
                                        className="h-full bg-[#d4a373]"
                                    />
                                </div>
                            </div>
                        ))}
                    </section>

                    <aside className="bg-white/50 dark:bg-white/[0.02] p-8 rounded-3xl border border-black/5 dark:border-white/5 backdrop-blur-sm">
                        <h2 className="text-xl font-serif font-bold mb-6">{t('ui.progress')}</h2>
                        <div className="flex items-center justify-center mb-8">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-black/5 dark:text-white/5" />
                                    <motion.circle
                                        cx="64" cy="64" r="60" stroke="#d4a373" strokeWidth="8" fill="transparent"
                                        strokeDasharray={377}
                                        initial={{ strokeDashoffset: 377 }}
                                        animate={{ strokeDashoffset: 377 - (377 * 0.35) }}
                                        className="transition-all duration-1000"
                                    />
                                </svg>
                                <span className="absolute text-2xl font-bold">35%</span>
                            </div>
                        </div>
                        <p className="text-sm text-center opacity-60">
                            {t('ui.lessonCompleted')}
                        </p>
                    </aside>
                </div>
            </div>
        </main>
    );
}
