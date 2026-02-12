'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft, Lock, CheckCircle2, Award } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import type { CodingCourseId } from '@/lib/courses/types';
import { buildCodingCourse, getCodingCourseMeta } from '@/lib/courses/coding';
import { usePlatformStore } from '@/lib/store/usePlatformStore';

function isCodingCourseId(value: string): value is CodingCourseId {
  return (
    value === 'python' ||
    value === 'java' ||
    value === 'csharp' ||
    value === 'c' ||
    value === 'cpp' ||
    value === 'go' ||
    value === 'javascript' ||
    value === 'typescript' ||
    value === 'css' ||
    value === 'react' ||
    value === 'react-native' ||
    value === 'sql' ||
    value === 'nosql' ||
    value === 'linux'
  );
}

export default function CodingCoursePage() {
  const params = useParams();
  const courseParam = params.course as string;
  const router = useRouter();
  const { t } = useTranslation();
  const { quiz, progress } = usePlatformStore();

  const courseId = isCodingCourseId(courseParam) ? (courseParam as CodingCourseId) : null;
  const meta = useMemo(() => (courseId ? getCodingCourseMeta(courseId) : undefined), [courseId]);
  const course = useMemo(() => (courseId ? buildCodingCourse(courseId) : null), [courseId]);

  if (!courseId || !course || !meta) {
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

  const minScore = course.minScoreToUnlockNext;
  const passed = course.modules.map((m) => {
    const key = `quiz:coding:${courseId}:${m.index}`;
    const s = quiz[key]?.score;
    return typeof s === 'number' ? s >= minScore : false;
  });

  const completedCount = passed.filter(Boolean).length;
  const totalPoints = course.modules.reduce((acc, m) => {
    const key = `quiz:coding:${courseId}:${m.index}`;
    const s = quiz[key]?.score;
    return acc + (typeof s === 'number' ? s : 0);
  }, 0);

  const eligibleCertificate = passed.length === 15 && passed.every(Boolean);

  return (
    <main className="min-h-screen p-8 pt-28 bg-[#fdfbf7] dark:bg-[#1a1a1a] notebook-lines">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push('/platform/coding')}
          className="flex items-center gap-2 mb-8 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{t('ui.backToCourses')}</span>
        </button>

        <header className="mb-10">
          <h1 className="text-5xl font-serif font-bold">{t(`courses.${courseId}`)}</h1>
          <p className="mt-3 opacity-70">{t('ui.courseProgressLine', { done: String(completedCount), total: '15' })}</p>
          <p className="text-sm opacity-60 mt-1">{t('ui.minScoreToUnlock', { score: String(minScore) })}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.modules.map((m) => {
              const locked = m.index > 1 && !passed[m.index - 2];
              const quizKey = `quiz:coding:${courseId}:${m.index}`;
              const score = quiz[quizKey]?.score;
              const pctKey = `courseModule:coding:${courseId}:${m.index}`;
              const pct = Math.max(0, Math.min(100, progress[pctKey] ?? 0));

              return locked ? (
                <div
                  key={m.id}
                  className="p-6 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 opacity-70"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold">{t('ui.moduleNumber', { n: String(m.index) })}</div>
                    <Lock size={16} className="opacity-60" />
                  </div>
                  <div className="mt-2 text-sm opacity-70">{t('ui.lockedUntilPass')}</div>
                  <div className="mt-3 text-xs opacity-60">{t('ui.prevModule')}</div>
                </div>
              ) : (
                <Link
                  key={m.id}
                  href={`/platform/coding/${courseId}/${m.index}`}
                  className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow block"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold opacity-60">
                        {t('ui.moduleNumber', { n: String(m.index) })}
                        {typeof score === 'number' ? ` · ${t('ui.points')}: ${score}/10` : ''}
                      </div>
                      <div className="font-bold mt-1">{t('ui.openModule')}</div>
                      <div className="text-sm opacity-70 mt-2">{t('ui.moduleIncludes')}</div>
                    </div>
                    {typeof score === 'number' && score >= minScore ? (
                      <CheckCircle2 size={18} className="text-green-600 dark:text-green-400" />
                    ) : null}
                  </div>
                  <div className="mt-4 w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#d4a373]" style={{ width: `${pct}%` }} />
                  </div>
                </Link>
              );
            })}
          </section>

          <aside className="sticky top-28 h-fit rounded-3xl bg-white/70 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 p-6">
            <div className="text-sm font-semibold mb-4">{t('ui.learningStats')}</div>
            <div className="text-sm opacity-80">
              <div>{t('ui.modulesPassed', { n: String(completedCount) })}</div>
              <div className="mt-1">{t('ui.totalPoints', { n: String(totalPoints) })}</div>
            </div>

            {eligibleCertificate && (
              <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <Award size={16} className="opacity-70" />
                  Finales Projekt
                </div>
                <Link
                  href={`/platform/coding/${courseId}/final-project`}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  Projekt wählen
                </Link>
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/10">
              <div className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Award size={16} className="opacity-70" />
                {t('ui.certificate')}
              </div>
              {eligibleCertificate ? (
                <Link
                  href={`/platform/coding/${courseId}/certificate`}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full bg-[#d4a373] text-black hover:bg-[#c9935f] transition-colors"
                >
                  {t('ui.openCertificate')}
                </Link>
              ) : (
                <div className="text-xs opacity-70">{t('ui.certificateLocked')}</div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
