'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { curriculum, getLocalized, isScienceSubject } from '@/lib/curriculum';
import type { LevelId, ModuleSectionType, SubjectId } from '@/lib/curriculum/types';
import { SubjectSearch } from '@/components/search/SubjectSearch';
import { QuizBlock } from '@/components/platform/QuizBlock';
import { WorksheetsBlock } from '@/components/platform/WorksheetsBlock';
import { usePlatformStore } from '@/lib/store/usePlatformStore';

const sectionOrder: ModuleSectionType[] = ['theory', 'examples', 'exercises', 'visuals', 'quiz', 'worksheets'];

export default function ModulePage() {
  const params = useParams();
  const subjectParam = params.subject as string;
  const levelParam = params.level as string;
  const moduleParam = params.module as string;
  const router = useRouter();
  const { t, language } = useTranslation();
  const { updateProgress } = usePlatformStore();

  const subjectId = (isScienceSubject(subjectParam) ? subjectParam : undefined) as SubjectId | undefined;
  const levelId = (levelParam === 'school' || levelParam === 'university' ? levelParam : undefined) as
    | LevelId
    | undefined;

  const subject = useMemo(() => (subjectId ? curriculum.subjects[subjectId] : null), [subjectId]);
  const level = useMemo(() => (subject && levelId ? subject.levels[levelId] : null), [subject, levelId]);
  const moduleData = useMemo(
    () => (level ? level.modules.find((m) => m.id === moduleParam) ?? null : null),
    [level, moduleParam]
  );

  if (!subjectId || !levelId || !subject || !level || !moduleData) {
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

  const moduleTitle = getLocalized(language, moduleData.title);
  const moduleDescription = getLocalized(language, moduleData.description);
  const progressKey = `module:${subjectId}:${levelId}:${moduleData.id}`;

  const sections = [...moduleData.sections].sort(
    (a, b) => sectionOrder.indexOf(a.type) - sectionOrder.indexOf(b.type)
  );

  return (
    <main className="min-h-screen p-8 pt-28 bg-[#fdfbf7] dark:bg-[#1a1a1a] notebook-lines">
      <Navbar />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,260px] gap-8">
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <button
              onClick={() => router.push(`/platform/${subjectId}/${levelId}`)}
              className="flex items-center gap-2 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{t('ui.backToModules')}</span>
            </button>

            <div className="w-full md:w-[420px]">
              <div className="text-xs font-semibold opacity-60 mb-2 text-right">{t('ui.subjectSearch')}</div>
              <SubjectSearch subjectId={subjectId} />
            </div>
          </div>

          <header className="mb-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold">{moduleTitle}</h1>
                <p className="mt-3 text-sm opacity-70 max-w-2xl">{moduleDescription}</p>
              </div>
              <button
                type="button"
                onClick={() => updateProgress(progressKey, 100)}
                className="hidden md:flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full bg-[#d4a373] text-black hover:bg-[#c9935f] transition-colors"
              >
                <CheckCircle2 size={16} />
                {t('ui.markCompleted')}
              </button>
            </div>
          </header>

          <div className="space-y-6">
            {sections.map((s) => (
              <section
                key={s.type}
                id={s.type}
                className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10"
              >
                <h2 className="text-2xl font-serif font-bold mb-3">{getLocalized(language, s.title)}</h2>
                <p className="text-sm opacity-80 leading-relaxed whitespace-pre-line">
                  {getLocalized(language, s.content)}
                </p>
              </section>
            ))}

            <section id="quiz">
              <QuizBlock
                quizKey={`quiz:${subjectId}:${levelId}:${moduleData.id}`}
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
              />
            </section>

            <section id="worksheets">
              <WorksheetsBlock
                worksheetsKey={`worksheets:${subjectId}:${levelId}:${moduleData.id}`}
                worksheets={moduleData.worksheets}
                language={language}
                labels={{
                  title: t('ui.worksheets'),
                  download: t('ui.download'),
                  onlineEdit: t('ui.onlineEdit'),
                  upload: t('ui.upload'),
                  teacherFeedback: t('ui.teacherFeedback'),
                  placeholder: t('ui.placeholder'),
                }}
              />
            </section>
          </div>
        </div>

        <aside className="hidden lg:block sticky top-28 h-fit rounded-3xl bg-white/70 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 p-5">
          <div className="text-sm font-semibold mb-3">{t('ui.onThisPage')}</div>
          <nav className="space-y-2 text-sm">
            {sections.map((s) => (
              <a
                key={s.type}
                href={`#${s.type}`}
                className="block px-3 py-2 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
              >
                {getLocalized(language, s.title)}
              </a>
            ))}
            <a
              href="#quiz"
              className="block px-3 py-2 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
            >
              {t('ui.quiz')}
            </a>
            <a
              href="#worksheets"
              className="block px-3 py-2 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
            >
              {t('ui.worksheets')}
            </a>
          </nav>

          <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/10">
            <Link
              href={`/platform/${subjectId}/${levelId}`}
              className="text-xs font-semibold opacity-70 hover:opacity-100 transition-opacity"
            >
              {t('ui.backToModules')}
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
