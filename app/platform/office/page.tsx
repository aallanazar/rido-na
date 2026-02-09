'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { buildOfficeCourse } from '@/lib/courses/office';
import { FileText, Sheet, Presentation, Lock, Award } from 'lucide-react';
import { usePlatformStore } from '@/lib/store/usePlatformStore';

export default function OfficeHome() {
  const { t } = useTranslation();
  const course = useMemo(() => buildOfficeCourse(), []);
  const { quiz, progress } = usePlatformStore();

  const minScore = course.minScoreToUnlockNext;
  const passed = course.modules.map((m) => {
    const key = `quiz:office:microsoft-office:${m.index}`;
    const s = quiz[key]?.score;
    return typeof s === 'number' ? s >= minScore : false;
  });
  const eligibleCertificate = passed.length === 15 && passed.every(Boolean);

  return (
    <main className="min-h-screen p-8 pt-28 bg-[#fdfbf7] dark:bg-[#1a1a1a] notebook-lines">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-5xl font-serif font-bold">{t('subjects.office')}</h1>
          <p className="mt-3 opacity-70">{t('ui.officeIntro')}</p>
        </header>

        <div className="p-7 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-[#d4a373]">
            <FileText size={18} />
            <Sheet size={18} />
            <Presentation size={18} />
            <span className="text-sm font-bold tracking-wider uppercase">{t('ui.officeModules')}</span>
          </div>
          <p className="mt-3 text-sm opacity-70">{t('ui.courseHas15Modules')}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs opacity-70">
            <span>{t('ui.minScoreToUnlock', { score: String(minScore) })}</span>
            <span>·</span>
            {eligibleCertificate ? (
              <Link href="/platform/office/certificate" className="inline-flex items-center gap-2 font-semibold underline">
                <Award size={14} />
                {t('ui.openCertificate')}
              </Link>
            ) : (
              <span>{t('ui.certificateLocked')}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.modules.map((m) => {
            const locked = m.index > 1 && !passed[m.index - 2];
            const quizKey = `quiz:office:microsoft-office:${m.index}`;
            const score = quiz[quizKey]?.score;
            const pctKey = `courseModule:office:microsoft-office:${m.index}`;
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
              </div>
            ) : (
              <Link
                key={m.id}
                href={`/platform/office/${m.index}`}
                className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow block"
              >
                <div className="text-xs font-semibold opacity-60">
                  {t('ui.moduleNumber', { n: String(m.index) })}
                  {typeof score === 'number' ? ` · ${t('ui.points')}: ${score}/10` : ''}
                </div>
                <div className="font-bold mt-1">{t('ui.openModule')}</div>
                <div className="text-sm opacity-70 mt-2">{t('ui.moduleIncludes')}</div>
                <div className="mt-4 w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#d4a373]" style={{ width: `${pct}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
