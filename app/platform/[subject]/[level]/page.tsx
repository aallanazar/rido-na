'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft, BookOpen, Clock, Star } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { curriculum, isScienceSubject, getLocalized } from '@/lib/curriculum';
import type { LevelId, SubjectId } from '@/lib/curriculum/types';
import { SubjectSearch } from '@/components/search/SubjectSearch';
import { usePlatformStore } from '@/lib/store/usePlatformStore';

const starsForLevel = (level: LevelId) => (level === 'school' ? 3 : 5);

export default function SubjectLevelPage() {
  const params = useParams();
  const subjectParam = params.subject as string;
  const levelParam = params.level as string;
  const router = useRouter();
  const { t, language } = useTranslation();
  const { progress } = usePlatformStore();

  const isScience = isScienceSubject(subjectParam);
  const subjectId = (isScience ? subjectParam : undefined) as SubjectId | undefined;
  const levelId = (levelParam === 'school' || levelParam === 'university' ? levelParam : undefined) as
    | LevelId
    | undefined;

  const subject = useMemo(() => (subjectId ? curriculum.subjects[subjectId] : null), [subjectId]);
  const level = useMemo(() => (subject && levelId ? subject.levels[levelId] : null), [subject, levelId]);

  if (!subjectId || !levelId || !subject || !level) {
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
          <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
            <p className="opacity-70">{t('ui.comingSoon')}</p>
          </div>
        </div>
      </main>
    );
  }

  const subjectTitle = getLocalized(language, subject.title);
  const levelTitle = getLocalized(language, level.title);

  return (
    <main className="min-h-screen p-8 pt-28 bg-[#fdfbf7] dark:bg-[#1a1a1a] notebook-lines">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push(`/platform/${subjectId}`)}
          className="flex items-center gap-2 mb-8 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{t('ui.backToLevelChoice')}</span>
        </button>

        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-[#d4a373]/20 text-[#d4a373] rounded-full text-xs font-bold uppercase tracking-wider">
                  {levelTitle}
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={
                        s <= starsForLevel(levelId)
                          ? 'fill-[#d4a373] text-[#d4a373]'
                          : 'text-black/10 dark:text-white/10'
                      }
                    />
                  ))}
                </div>
              </div>
              <h1 className="text-5xl font-serif font-bold">{subjectTitle}</h1>
            </div>

            <div className="relative w-full md:w-[420px]">
              <div className="text-xs font-semibold opacity-60 mb-2 text-right">{t('ui.subjectSearch')}</div>
              <SubjectSearch subjectId={subjectId} />
            </div>
          </div>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-bold">{t('ui.modules')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {level.modules.map((m) => {
              const progressKey = `module:${subjectId}:${levelId}:${m.id}`;
              const pct = Math.max(0, Math.min(100, progress[progressKey] ?? 0));
              return (
                <Link
                  key={m.id}
                  href={`/platform/${subjectId}/${levelId}/${m.id}`}
                  className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group block"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4a373]/10 flex items-center justify-center text-[#d4a373]">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold">{getLocalized(language, m.title)}</h3>
                        <p className="text-xs opacity-60 mt-1">{getLocalized(language, m.description)}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-black/40 dark:text-white/40 flex items-center gap-1">
                      <Clock size={12} /> 15 min
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#d4a373]" style={{ width: `${pct}%` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

