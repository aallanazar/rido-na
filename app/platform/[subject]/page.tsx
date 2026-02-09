'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft, GraduationCap, BookOpen } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { isScienceSubject } from '@/lib/curriculum';
import type { SubjectId } from '@/lib/curriculum/types';
import { SubjectSearch } from '@/components/search/SubjectSearch';

export default function SubjectPage() {
  const params = useParams();
  const subjectParam = params.subject as string;
  const router = useRouter();
  const { t } = useTranslation();

  const title = subjectParam ? t(`subjects.${subjectParam}`) : 'Subject';
  const isScience = isScienceSubject(subjectParam);
  const subjectId = (isScience ? subjectParam : undefined) as SubjectId | undefined;

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

        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
            <h1 className="text-5xl font-serif font-bold">{title}</h1>
            {subjectId ? (
              <div className="w-full md:w-[420px]">
                <div className="text-xs font-semibold opacity-60 mb-2 text-right">
                  {t('ui.subjectSearch')}
                </div>
                <SubjectSearch subjectId={subjectId} />
              </div>
            ) : null}
          </div>
        </header>

        {isScience ? (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => router.push(`/platform/${subjectParam}/school`)}
              className="text-left p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3 text-[#d4a373]">
                <BookOpen size={22} />
                <span className="text-sm font-bold tracking-wider uppercase">
                  {t('ui.schoolLevel')}
                </span>
              </div>
              <div className="text-xl font-serif font-bold mb-2">{t('ui.chooseSchoolPath')}</div>
              <p className="text-sm opacity-70">{t('ui.chooseSchoolPathHint')}</p>
            </button>

            <button
              onClick={() => router.push(`/platform/${subjectParam}/university`)}
              className="text-left p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3 text-[#d4a373]">
                <GraduationCap size={22} />
                <span className="text-sm font-bold tracking-wider uppercase">
                  {t('ui.universityLevel')}
                </span>
              </div>
              <div className="text-xl font-serif font-bold mb-2">{t('ui.chooseUniPath')}</div>
              <p className="text-sm opacity-70">{t('ui.chooseUniPathHint')}</p>
            </button>
          </section>
        ) : (
          <section className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
            <p className="opacity-70">{t('ui.comingSoon')}</p>
          </section>
        )}
      </div>
    </main>
  );
}
