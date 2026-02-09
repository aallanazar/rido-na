'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft, Award } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import type { CodingCourseId } from '@/lib/courses/types';
import { buildCodingCourse } from '@/lib/courses/coding';
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

export default function CodingCertificatePage() {
  const params = useParams();
  const courseParam = params.course as string;
  const router = useRouter();
  const { t } = useTranslation();
  const { quiz } = usePlatformStore();

  const courseId = isCodingCourseId(courseParam) ? (courseParam as CodingCourseId) : null;
  const course = useMemo(() => (courseId ? buildCodingCourse(courseId) : null), [courseId]);

  if (!courseId || !course) {
    return (
      <main className="min-h-screen p-8 pt-28 bg-[#fdfbf7] dark:bg-[#1a1a1a] notebook-lines">
        <Navbar />
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/platform/coding')}
            className="flex items-center gap-2 mb-8 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{t('ui.backToCourses')}</span>
          </button>
          <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
            <p className="opacity-70">{t('ui.comingSoon')}</p>
          </div>
        </div>
      </main>
    );
  }

  const minScore = course.minScoreToUnlockNext;
  const passed = course.modules.every((m) => {
    const key = `quiz:coding:${courseId}:${m.index}`;
    const s = quiz[key]?.score;
    return typeof s === 'number' && s >= minScore;
  });

  return (
    <main className="min-h-screen p-8 pt-28 bg-[#fdfbf7] dark:bg-[#1a1a1a] notebook-lines">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push(`/platform/coding/${courseId}`)}
          className="flex items-center gap-2 mb-8 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{t('ui.backToModules')}</span>
        </button>

        {!passed ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
            <p className="opacity-70">{t('ui.certificateLocked')}</p>
          </div>
        ) : (
          <div className="p-10 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-center">
            <div className="flex items-center justify-center gap-2 text-[#d4a373] mb-4">
              <Award size={22} />
              <span className="text-sm font-bold tracking-wider uppercase">{t('ui.certificate')}</span>
            </div>
            <h1 className="text-4xl font-serif font-bold mb-3">{t('ui.certificateTitle')}</h1>
            <p className="opacity-70">{t('ui.certificateFor', { course: t(`courses.${courseId}`) })}</p>
            <div className="mt-8 text-xs opacity-60">{new Date().toLocaleDateString()}</div>
          </div>
        )}
      </div>
    </main>
  );
}

