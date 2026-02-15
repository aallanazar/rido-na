'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { BookOpen, AlertCircle, PenTool, Code as CodeIcon, ArrowLeft } from 'lucide-react';
import { PracticeEditor } from '@/components/platform/PracticeEditor';
import { CodePlayground } from '@/components/platform/CodePlayground';

export default function SubjectPage() {
    const params = useParams();
    const router = useRouter();
    // Ensure subject is a string
    const subjectId = Array.isArray(params.subject) ? params.subject[0] : params.subject;
    const { t } = useTranslation();
    const [practiceMode, setPracticeMode] = useState<'selection' | 'writing' | 'coding'>('selection');

    // Handle "Practice" subject specifically
    if (subjectId === 'practice') {
        return (
            <main className="min-h-screen bg-background flex flex-col">
                <Navbar />

                <div className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-12">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-foreground">
                                {t('ui.practiceMode')}
                            </h1>
                            <div className="h-1 w-24 bg-primary rounded-full" />
                        </div>

                        {practiceMode !== 'selection' && (
                            <button
                                onClick={() => setPracticeMode('selection')}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
                            >
                                <ArrowLeft size={16} />
                                <span className="text-sm font-medium text-foreground">{t('ui.backToSelection')}</span>
                            </button>
                        )}
                    </div>

                    {/* Selection Mode */}
                    {practiceMode === 'selection' && (
                        <div className="flex flex-col gap-6 max-w-2xl mx-auto mt-12 w-full">
                            {/* Writing Card */}
                            <button
                                onClick={() => setPracticeMode('writing')}
                                className="group relative overflow-hidden p-8 rounded-3xl bg-card border border-border hover:border-primary transition-all hover:shadow-xl text-left flex flex-row items-center gap-6 w-full"
                            >
                                <div className="shrink-0 bg-primary/10 p-4 rounded-full text-primary group-hover:scale-110 transition-transform">
                                    <PenTool size={32} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-1 text-foreground">{t('ui.writing')}</h2>
                                    <p className="text-muted-foreground text-sm">
                                        Write like in a Word document, with rich text and digital pen support.
                                    </p>
                                </div>
                            </button>

                            {/* Coding Card */}
                            <button
                                onClick={() => setPracticeMode('coding')}
                                className="group relative overflow-hidden p-8 rounded-3xl bg-card border border-border hover:border-secondary transition-all hover:shadow-xl text-left flex flex-row items-center gap-6 w-full"
                            >
                                <div className="shrink-0 bg-secondary/10 p-4 rounded-full text-secondary group-hover:scale-110 transition-transform">
                                    <CodeIcon size={32} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-1 text-foreground">{t('ui.coding')}</h2>
                                    <p className="text-muted-foreground text-sm">
                                        Write and experiment with code in a dedicated playground environment.
                                    </p>
                                </div>
                            </button>
                        </div>
                    )}

                    {/* Writing App */}
                    {practiceMode === 'writing' && (
                        <div className="w-full h-[calc(100vh-250px)] min-h-150">
                            <PracticeEditor moduleId="practice-free-write" />
                        </div>
                    )}

                    {/* Coding App */}
                    {practiceMode === 'coding' && (
                        <div className="w-full">
                            <CodePlayground title={t('ui.coding')} mode="code" initialCode="// Write your code here..." />
                        </div>
                    )}
                </div>
            </main>
        );
    }

    // Default view for other subjects (placeholder)
    const translated = t(`subjects.${subjectId}`);
    const displayTitle = (translated && translated !== `subjects.${subjectId}`)
        ? translated
        : (subjectId ? subjectId.charAt(0).toUpperCase() + subjectId.slice(1) : 'Subject');

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-12">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-foreground">
                        {displayTitle}
                    </h1>
                    <div className="h-1 w-24 bg-primary rounded-full" />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Placeholder Content Cards */}
                    <div className="col-span-full bg-card rounded-2xl p-8 border border-border text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <BookOpen size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-foreground">{t('ui.contentComingSoon') || 'Coming Soon'}</h2>
                        <p className="text-muted-foreground max-w-lg mx-auto">
                            We are currently preparing high-quality materials for <span className="font-semibold text-primary">{displayTitle}</span>.
                            Please check back later or explore other subjects.
                        </p>
                    </div>

                    {/* Dummy skeleton loaders to make it look "active" */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse border border-border" />
                    ))}
                </div>
            </div>
        </main>
    );
}
