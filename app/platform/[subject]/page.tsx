'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { BookOpen, AlertCircle } from 'lucide-react';

export default function SubjectPage() {
    const params = useParams();
    // Ensure subject is a string
    const subjectId = Array.isArray(params.subject) ? params.subject[0] : params.subject;
    const { t } = useTranslation();

    // Try to get translated name, fallback to capitalized ID
    // We check if the translation returns the key (which usually means missing translation) 
    // or just trust the translation hook to return the key if missing?
    // The custom hook implementation is unknown, usually it returns key if missing.
    // We can just try to use it.
    const translated = t(`subjects.${subjectId}`);
    const displayTitle = (translated && translated !== `subjects.${subjectId}`)
        ? translated
        : (subjectId ? subjectId.charAt(0).toUpperCase() + subjectId.slice(1) : 'Subject');

    return (
        <main className="min-h-screen bg-[#fdfbf7] dark:bg-[#0c0c0c] flex flex-col">
            <Navbar />

            <div className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-12">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-zinc-900 dark:text-white">
                        {displayTitle}
                    </h1>
                    <div className="h-1 w-24 bg-amber-500 rounded-full" />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Placeholder Content Cards */}
                    <div className="col-span-full bg-white dark:bg-zinc-900/50 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 text-center">
                        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600 dark:text-amber-500">
                            <BookOpen size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">{t('ui.contentComingSoon') || 'Coming Soon'}</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
                            We are currently preparing high-quality materials for <span className="font-semibold text-amber-600 dark:text-amber-400">{displayTitle}</span>.
                            Please check back later or explore other subjects.
                        </p>
                    </div>

                    {/* Dummy skeleton loaders to make it look "active" */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 rounded-2xl bg-zinc-100 dark:bg-zinc-900 animate-pulse border border-zinc-200/50 dark:border-zinc-800/50" />
                    ))}
                </div>
            </div>
        </main>
    );
}
