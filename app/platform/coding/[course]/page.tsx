'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft, Lock, CheckCircle2, Award, ChevronRight, Zap } from 'lucide-react';
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
      <main className="min-h-screen p-8 pt-28 bg-background-light dark:bg-background-dark">
        <Navbar />
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 mb-8 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{t('ui.backToSelection')}</span>
          </button>
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
    <main className="min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900/0 to-slate-900/0 pointer-events-none z-0 dark:block hidden"></div>

      <Navbar />

      <div className="relative z-10 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.push('/platform/coding')}
            className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft size={18} className="mr-1 transform group-hover:-translate-x-1 transition-transform" />
            Back to Course Selection
          </button>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                {t(`courses.${courseId}`)}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-mono text-sm max-w-xl">
                {t('ui.courseProgressLine', { done: String(completedCount), total: '15' })}
              </p>
            </div>

            {/* Stats Box */}
            <div className="flex gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm min-w-[300px]">
              <div className="flex-1 text-center border-r border-slate-200 dark:border-slate-700 pr-4">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Modules
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {completedCount}<span className="text-slate-400 text-lg">/{course.modules.length}</span>
                </div>
                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    style={{ width: `${(completedCount / course.modules.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex-1 text-center pl-4">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Min. Score
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {minScore}<span className="text-slate-400 text-lg">/10</span>
                </div>
                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[70%] shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
            {course.modules.map((m, idx) => {
              const locked = m.index > 1 && !passed[m.index - 2];
              const quizKey = `quiz:coding:${courseId}:${m.index}`;
              const score = quiz[quizKey]?.score;
              const pctKey = `courseModule:coding:${courseId}:${m.index}`;
              const pct = Math.max(0, Math.min(100, progress[pctKey] ?? 0));
              const isActive = m.index === 1 || (m.index > 1 && passed[m.index - 2]);
              const isComplete = typeof score === 'number' && score >= minScore;

              if (locked) {
                return (
                  <div
                    key={m.id}
                    className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col justify-between opacity-75 hover:opacity-100 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600"
                  >
                    <div className="absolute top-6 right-6 text-slate-300 dark:text-slate-600">
                      <Lock size={20} />
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                        Module {m.index}
                      </h3>
                      <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300">Locked</h2>
                    </div>
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-xs text-slate-400 dark:text-slate-500 italic">
                        Unlock by passing the previous quiz.
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={m.id}
                  href={`/platform/coding/${courseId}/${m.index}`}
                  className={`relative group ${isActive ? '' : 'opacity-75 hover:opacity-100'} transition-all duration-300`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-blue-500 opacity-20 blur-xl rounded-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
                  )}
                  <div
                    className={`relative h-full ${isActive ? 'bg-white dark:bg-slate-800 border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'} rounded-2xl p-6 flex flex-col justify-between overflow-hidden transition-all`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className={`text-xs font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-blue-500' : 'text-slate-400 dark:text-slate-500'}`}>
                          Module {m.index}
                        </h3>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('ui.openModule')}</h2>
                      </div>
                      {isActive && (
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs font-mono rounded border border-blue-500/20">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="space-y-4 mb-6">
                      <p className="text-sm text-slate-600 dark:text-slate-300">{t('ui.moduleIncludes')}</p>
                      {isActive && (
                        <div className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-black/30 p-2 rounded border border-slate-200 dark:border-white/10">
                          &gt; {t('ui.moduleNumber', { n: String(m.index) })}<br/>
                          &gt; "Theory", "Examples"
                        </div>
                      )}
                    </div>

                    {isActive && (
                      <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group-hover:gap-3 mb-4">
                        Open Section
                        <ChevronRight size={16} />
                      </button>
                    )}

                    <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span>Progress</span>
                      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[15%] rounded-full relative transaction">
                          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]"></div>
                        </div>
                      </div>
                      <span className="font-mono text-slate-900 dark:text-white">{Math.round(pct)}%</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Certificates and Projects Section */}
          {eligibleCertificate && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <Link
                href={`/platform/coding/${courseId}/final-project`}
                className="relative group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg transition-all"
              >
                <div className="absolute top-6 right-6 text-purple-500">
                  <Zap size={20} />
                </div>
                <h3 className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-2">Achievement Unlocked</h3>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Final Projects</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">Build real-world projects to cement your skills.</p>
              </Link>

              <Link
                href={`/platform/coding/${courseId}/certificate`}
                className="relative group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all"
              >
                <div className="absolute top-6 right-6 text-emerald-500">
                  <Award size={20} />
                </div>
                <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Completion</h3>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Certificate</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">Show your achievement with a certificate.</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
