'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { languageCourses } from '@/lib/i18n/courses';

export default function LanguageCoursePage() {
  const params = useParams();
  const target = params.target as string;
  const router = useRouter();
  const { t, language } = useTranslation();

  const course = useMemo(() => {
    const byTarget = languageCourses[target];
    if (!byTarget) return null;
    return byTarget[language] ?? byTarget.en ?? byTarget.de ?? byTarget.uz ?? null;
  }, [target, language]);

  return (
    <main className="min-h-screen p-8 pt-28 bg-[#fdfbf7] dark:bg-[#1a1a1a] notebook-lines">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 mb-8 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{t('ui.backToSelection')}</span>
        </button>

        {!course ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
            <p className="opacity-70">{t('ui.comingSoon')}</p>
          </div>
        ) : (
          <>
            <header className="mb-10">
              <h1 className="text-5xl font-serif font-bold mb-3">{course.title}</h1>
              <p className="opacity-70">{course.description}</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
                <h2 className="text-xl font-serif font-bold mb-4">{t('languageCourse.vocabulary')}</h2>
                <ul className="space-y-3">
                  {course.vocabulary.map((v) => (
                    <li key={v.word} className="text-sm">
                      <div className="font-semibold">{v.word}</div>
                      <div className="opacity-70">{v.translation}</div>
                      <div className="text-xs opacity-60">{v.pronunciation}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
                <h2 className="text-xl font-serif font-bold mb-4">{t('languageCourse.grammar')}</h2>
                <div className="font-semibold mb-2">{course.grammar.title}</div>
                <p className="text-sm opacity-80 whitespace-pre-line">{course.grammar.content}</p>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
