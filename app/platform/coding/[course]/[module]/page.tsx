'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import type { CodingCourseId } from '@/lib/courses/types';
import { buildCodingCourse } from '@/lib/courses/coding';
import { QuizBlock } from '@/components/platform/QuizBlock';
import { HomeworksBlock } from '@/components/platform/HomeworksBlock';
import { CodePlayground } from '@/components/platform/CodePlayground';
import { TerminalSimulator } from '@/components/platform/TerminalSimulator';
import { MaterialsBlock } from '@/components/platform/MaterialsBlock';
import { usePlatformStore } from '@/lib/store/usePlatformStore';
import { getLocalized } from '@/lib/curriculum';

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

export default function CodingModulePage() {
  const params = useParams();
  const courseParam = params.course as string;
  const moduleParam = params.module as string;
  const router = useRouter();
  const { t, language } = useTranslation();
  const { quiz, updateProgress, notes, setNote } = usePlatformStore();

  const courseId = isCodingCourseId(courseParam) ? (courseParam as CodingCourseId) : null;
  const index = Number(moduleParam);
  const course = useMemo(() => (courseId ? buildCodingCourse(courseId) : null), [courseId]);

  const moduleData = course ? course.modules.find((m) => m.index === index) ?? null : null;

  if (!courseId || !course || !moduleData || !Number.isFinite(index) || index < 1 || index > 15) {
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
  const prevKey = index > 1 ? `quiz:coding:${courseId}:${index - 1}` : null;
  const prevScore = prevKey ? quiz[prevKey]?.score : undefined;
  const locked = index > 1 ? !(typeof prevScore === 'number' && prevScore >= minScore) : false;

  if (locked) {
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
          <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2 font-semibold mb-2">
              <Lock size={18} className="opacity-70" />
              {t('ui.moduleLocked')}
            </div>
            <p className="opacity-70">{t('ui.lockedNeedScore', { score: String(minScore) })}</p>
          </div>
        </div>
      </main>
    );
  }

  const quizKey = `quiz:coding:${courseId}:${index}`;
  const notesKey = `notes:coding:${courseId}:${index}`;
  const pctKey = `courseModule:coding:${courseId}:${index}`;

  const isWeb = course.features.includes('live-preview') && (courseId === 'javascript' || courseId === 'css');
  const isLinux = courseId === 'linux';

  return (
    <main className="min-h-screen p-8 pt-28 bg-[#fdfbf7] dark:bg-[#1a1a1a] notebook-lines">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push(`/platform/coding/${courseId}`)}
          className="flex items-center gap-2 mb-8 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{t('ui.backToModules')}</span>
        </button>

        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold opacity-60">{t(`courses.${courseId}`)}</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">
              {t('ui.moduleNumber', { n: String(index) })}
            </h1>
            <p className="mt-3 text-sm opacity-70">{getLocalized(language, moduleData.description)}</p>
          </div>
          <button
            type="button"
            onClick={() => updateProgress(pctKey, 100)}
            className="hidden md:flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full bg-[#d4a373] text-black hover:bg-[#c9935f] transition-colors"
          >
            <CheckCircle2 size={16} />
            {t('ui.markCompleted')}
          </button>
        </header>

        <div className="space-y-6">
          {moduleData.sections.map((s) => (
            <section
              key={s.type}
              id={s.type}
              className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10"
            >
              <h2 className="text-2xl font-serif font-bold mb-3">{getLocalized(language, s.title)}</h2>
              <p className="text-sm opacity-80 whitespace-pre-line">{getLocalized(language, s.content)}</p>
            </section>
          ))}

          {isLinux ? <TerminalSimulator title={t('ui.terminalSimulator')} /> : null}

          {course.features.includes('code-editor') ? (
            <CodePlayground
              title={isWeb ? t('ui.livePreview') : t('ui.codeEditor')}
              mode={isWeb ? 'web' : 'code'}
            />
          ) : null}

          <section id="quiz">
            <QuizBlock
              quizKey={quizKey}
              title={getLocalized(language, moduleData.quizTitle)}
              questions={moduleData.quiz}
              language={language}
              labels={{
                points: t('ui.points'),
                evaluate: t('ui.evaluateQuiz'),
                showSolutions: t('ui.showSolutions'),
                hideSolutions: t('ui.hideSolutions'),
                correct: t('ui.correct'),
                wrong: t('ui.wrong'),
                unanswered: t('ui.unanswered'),
              }}
              onEvaluate={(s) => {
                if (s >= minScore) updateProgress(pctKey, 100);
              }}
            />
            <div className="mt-3 text-xs opacity-70">
              {t('ui.unlockHint', { score: String(minScore) })}
            </div>
          </section>

          <section id="materials">
            <MaterialsBlock
              title={t('ui.downloadMaterials')}
              materials={moduleData.materials}
              language={language}
              labels={{ download: t('ui.download') }}
            />
          </section>

          <section id="homework">
            <HomeworksBlock
              homeworksKey={`homeworks:coding:${courseId}:${index}`}
              homeworks={moduleData.homeworks}
              language={language}
              labels={{
                title: t('ui.homeworks'),
                upload: t('ui.upload'),
                codeInput: t('ui.codeInput'),
                placeholder: t('ui.placeholder'),
                rating: t('ui.ratingPlaceholder'),
                feedback: t('ui.teacherFeedback'),
              }}
            />
          </section>

          <section id="notes" className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
            <h3 className="text-xl font-serif font-bold mb-3">{t('ui.notes')}</h3>
            <textarea
              value={notes[notesKey] ?? ''}
              onChange={(e) => setNote(notesKey, e.target.value)}
              className="w-full min-h-[160px] rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm focus:outline-none focus:border-[#d4a373]/60"
              placeholder={t('ui.notesPlaceholder')}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
