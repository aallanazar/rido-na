'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Volume2, CheckCircle2, Award, Zap } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { languageCourses } from '@/lib/i18n/courses';

export default function LanguageCoursePage() {
    const params = useParams();
    const target = params.target as string;
    const router = useRouter();
    const { t, language } = useTranslation();

    const [activeTab, setActiveTab] = useState<'vocabulary' | 'grammar' | 'quiz'>('vocabulary');
    const [revealedWords, setRevealedWords] = useState<number[]>([]);

    // Find content based on target language and current interface language
    const course = languageCourses[target]?.[language] || languageCourses[target]?.en;

    if (!course) {
        return (
            <main className="min-h-screen p-8 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-serif mb-4">Kurs nicht gefunden / Course not found</h1>
                    <button onClick={() => router.push('/')} className="text-[#d4a373]">Zurück / Back</button>
                </div>
            </main>
        );
    }

    const toggleWord = (index: number) => {
        if (revealedWords.includes(index)) {
            setRevealedWords(revealedWords.filter(i => i !== index));
        } else {
            setRevealedWords([...revealedWords, index]);
        }
    };

    return (
        <main className="min-h-screen p-8 pt-24 bg-[#fdfbf7] dark:bg-[#1a1a1a] notebook-lines paper-texture">
            <Navbar />

            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 mb-8 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>{t('ui.backToSelection')}</span>
                </button>

                <header className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-3 py-1 bg-[#d4a373]/20 text-[#d4a373] rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Zap size={14} /> {t('languageCourse.level')} A1
                                </span>
                                <span className="text-xs font-medium opacity-40 font-serif italic">
                                    {t('languageCourse.teachingIn')}
                                </span>
                            </div>
                            <h1 className="text-5xl font-serif font-bold text-[#2c3e50] dark:text-[#e0e0e0]">{course.title}</h1>
                            <p className="mt-4 text-xl font-sans opacity-60 max-w-2xl">{course.description}</p>
                        </div>

                        <div className="md:w-64 bg-white/50 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold uppercase tracking-tighter opacity-40">{t('ui.progress')}</span>
                                <span className="text-xs font-bold text-[#d4a373]">25%</span>
                            </div>
                            <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#d4a373] w-1/4" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-xl w-fit">
                        {(['vocabulary', 'grammar', 'quiz'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                                        ? 'bg-white dark:bg-white/10 shadow-sm text-[#d4a373]'
                                        : 'opacity-50 hover:opacity-100'
                                    }`}
                            >
                                {t(`languageCourse.${tab}`)}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'vocabulary' && (
                            <motion.div
                                key="vocab"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {course.vocabulary.map((v, i) => (
                                    <motion.div
                                        key={i}
                                        layoutId={`card-${i}`}
                                        onClick={() => toggleWord(i)}
                                        className="group perspective-1000 h-48 cursor-pointer"
                                    >
                                        <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${revealedWords.includes(i) ? 'rotate-y-180' : ''}`}>
                                            {/* Front: Foreign Word */}
                                            <div className="absolute inset-0 backface-hidden bg-white dark:bg-white/5 rounded-3xl border-2 border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center p-6 text-center">
                                                <div className="text-3xl font-serif font-bold mb-2 group-hover:scale-110 transition-transform">{v.word}</div>
                                                <div className="text-xs font-sans opacity-40 tracking-wider font-mono">{v.pronunciation}</div>
                                                <div className="mt-4 w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Volume2 size={16} className="text-[#d4a373]" />
                                                </div>
                                            </div>

                                            {/* Back: Native Translation */}
                                            <div className="absolute inset-0 backface-hidden bg-[#d4a373]/5 dark:bg-[#d4a373]/10 rounded-3xl border-2 border-[#d4a373]/30 rotate-y-180 flex flex-col items-center justify-center p-6 text-center">
                                                <div className="text-xs font-bold uppercase tracking-widest text-[#d4a373] mb-2">{t('languageCourse.vocabulary')}</div>
                                                <div className="text-2xl font-serif font-bold text-[#d4a373]">{v.translation}</div>
                                                <CheckCircle2 size={24} className="mt-4 text-[#d4a373] opacity-50" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'grammar' && (
                            <motion.div
                                key="grammar"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white dark:bg-white/5 rounded-3xl p-12 border border-black/5 dark:border-white/5 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a373]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                                <h3 className="text-3xl font-serif font-bold mb-8 flex items-center gap-4">
                                    <BookOpen className="text-[#d4a373]" /> {course.grammar.title}
                                </h3>
                                <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed opacity-80 font-sans whitespace-pre-wrap">
                                    {course.grammar.content}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'quiz' && (
                            <motion.div
                                key="quiz"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-24 h-24 rounded-full bg-[#d4a373]/10 flex items-center justify-center text-[#d4a373] mb-8">
                                    <Award size={48} />
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-4">{t('languageCourse.quiz')}</h3>
                                <p className="max-w-md opacity-60 mb-8">Bereit für dein erstes Quiz zur Überprüfung deines Wissens? / Are you ready for your first quiz to check your knowledge?</p>
                                <button className="px-8 py-3 bg-[#d4a373] text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
                                    Quiz Starten / Start Quiz
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
