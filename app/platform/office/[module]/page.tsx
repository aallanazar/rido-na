'use client';

import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft, Lock, Download, Play, Volume2, Fullscreen, CircleHelp, Settings } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { buildOfficeCourse } from '@/lib/courses/office';
import { QuizBlock } from '@/components/platform/QuizBlock';
import { HomeworksBlock } from '@/components/platform/HomeworksBlock';
import { MaterialsBlock } from '@/components/platform/MaterialsBlock';
import { usePlatformStore } from '@/lib/store/usePlatformStore';
import { getLocalized } from '@/lib/curriculum';

export default function OfficeModulePage() {
  const params = useParams();
  const moduleParam = params.module as string;
  const router = useRouter();
  const { t, language } = useTranslation();
  const { quiz, updateProgress, notes, setNote } = usePlatformStore();
  const [markedComplete, setMarkedComplete] = useState(false);

  const index = Number(moduleParam);
  const course = useMemo(() => buildOfficeCourse(), []);
  const moduleData = course.modules.find((m) => m.index === index) ?? null;

  if (!moduleData || !Number.isFinite(index) || index < 1 || index > 15) {
    return (
      <main className="min-h-screen p-8 pt-28 bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/platform/office')}
            className="flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{t('ui.backToCourses')}</span>
          </button>
          <div className="p-8 rounded-3xl bg-card border border-border">
            <p className="opacity-70">{t('ui.comingSoon')}</p>
          </div>
        </div>
      </main>
    );
  }

  const minScore = course.minScoreToUnlockNext;
  const prevKey = index > 1 ? `quiz:office:microsoft-office:${index - 1}` : null;
  const prevScore = prevKey ? quiz[prevKey]?.score : undefined;
  const locked = index > 1 ? !(typeof prevScore === 'number' && prevScore >= minScore) : false;

  if (locked) {
    return (
      <main className="min-h-screen p-8 pt-28 bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/platform/office')}
            className="flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{t('ui.backToModules')}</span>
          </button>
          <div className="p-8 rounded-3xl bg-card border border-border">
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

  const quizKey = `quiz:office:microsoft-office:${index}`;
  const notesKey = `notes:office:microsoft-office:${index}`;
  const pctKey = `courseModule:office:microsoft-office:${index}`;

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Top Bar */}
      <header className="h-16 shrink-0 bg-card border-b border-border flex items-center justify-between px-6 z-10 mt-16">
        <nav className="flex items-center text-sm text-muted-foreground">
          <span>{t('subjects.office')}</span>
          <span className="material-icons text-base mx-2">chevron_right</span>
          <span>{t('ui.moduleNumber', { n: String(index) })}</span>
          <span className="material-icons text-base mx-2">chevron_right</span>
          <span className="text-foreground font-medium">{getLocalized(language, moduleData.description)}</span>
        </nav>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <CircleHelp size={18} />
            <span>Help</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-background p-6 md:p-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header & Intro */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Excel Module {String(index).padStart(2, '0')}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{getLocalized(language, moduleData.description)}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">{getLocalized(language, moduleData.sections[0]?.content || 'Master the fundamentals of this module through interactive lessons and hands-on practice.')}</p>
            </div>

            {/* Download Card */}
            <div className="bg-card border border-border rounded-xl p-4 w-full md:w-72 shadow-sm shrink-0">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Download size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Practice File</h3>
                  <p className="text-xs text-muted-foreground mt-1">Module_{index}_Resources.xlsx</p>
                  <p className="text-xs text-muted-foreground">2.4 MB</p>
                </div>
              </div>
              <button className="mt-4 w-full flex items-center justify-center gap-2 bg-foreground text-background py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                <Download size={16} />
                Download Resource
              </button>
            </div>
          </div>

          {/* Video Player Section */}
          <div className="rounded-xl overflow-hidden bg-black shadow-lg relative group">
            <div className="aspect-video flex items-center justify-center bg-muted relative">
              <div className="absolute inset-0 opacity-30 flex items-center justify-center">
                <Play className="text-muted-foreground" size={60} />
              </div>
              <button className="relative z-10 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-background shadow-[0_0_30px_rgba(var(--primary),0.4)] hover:scale-110 transition-transform">
                <Play size={28} className="ml-1" fill="currentColor" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="font-medium">Lesson Walkthrough</h3>
                  <span className="text-xs text-slate-300">12:45 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-full"><Volume2 size={18} /></button>
                  <button className="p-2 hover:bg-white/10 rounded-full"><Fullscreen size={18} /></button>
                </div>
              </div>
              <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden">
                <div className="w-1/3 h-full bg-primary"></div>
              </div>
            </div>
          </div>

          {/* Two Column Layout: Steps & Checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Step-by-Step Guide */}
            <div className="lg:col-span-2 space-y-2">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-primary rounded-sm"></span>
                Step-by-Step Guide
              </h2>

              {/* Steps */}
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="relative pl-10 pb-8 group">
                  <div className={`absolute left-0 top-0 w-8 h-8 ${stepNum === 1 ? 'bg-muted border-2 border-primary text-primary' : 'bg-muted border-2 border-muted-foreground text-muted-foreground group-hover:border-primary group-hover:text-primary'} rounded-full flex items-center justify-center font-bold text-sm z-10 transition-colors`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-muted-foreground/30" />
                  )}
                  <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {stepNum === 1 && 'Master the Tools & Interface'}
                      {stepNum === 2 && 'Learn Key Functions & Features'}
                      {stepNum === 3 && 'Practice with Real Data'}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {stepNum === 1 && 'Familiarize yourself with all the essential tools and interface elements. Start by exploring the ribbon interface and understanding where each feature is located.'}
                      {stepNum === 2 && 'Dive deep into advanced features and learn how to combine them for maximum productivity. Practice creating complex formulas and automation.'}
                      {stepNum === 3 && 'Apply everything you\'ve learned with hands-on exercises using realistic datasets from various industries.'}
                    </p>
                    <div className="rounded-lg overflow-hidden border border-border bg-muted/30 relative">
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">Practice Zone</div>
                      <div className="h-40 flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <Play className="mx-auto mb-2 text-muted-foreground" size={28} />
                          <p className="text-sm">Interactive practice area</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Sticky Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Task Checklist */}
              <div className="bg-card border border-border rounded-xl p-6 sticky top-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground">Task Checklist</h3>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">1/4 Done</span>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Download the practice file', checked: true },
                    { title: 'Watch the lesson video', checked: false },
                    { title: 'Complete all steps', checked: false },
                    { title: 'Pass the quiz', checked: false },
                  ].map((task, idx) => (
                    <label key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group">
                      <input
                        type="checkbox"
                        defaultChecked={task.checked}
                        className="mt-1 w-4 h-4 text-primary bg-background border-muted-foreground rounded focus:ring-primary focus:ring-offset-0 focus:ring-2"
                      />
                      <span className={`text-sm ${task.checked ? 'line-through text-muted-foreground' : 'text-foreground group-hover:text-primary transition-colors'}`}>
                        {task.title}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Key Shortcuts</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Select All Data', key: 'Ctrl + A' },
                      { label: 'Create Table', key: 'Ctrl + T' },
                      { label: 'Save File', key: 'Ctrl + S' },
                    ].map((shortcut, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{shortcut.label}</span>
                        <kbd className="bg-muted px-2 py-0.5 rounded border border-border font-mono text-xs text-muted-foreground">
                          {shortcut.key}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="space-y-6">
            {moduleData.sections.map((s) => (
              <section key={s.type} className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-3">{getLocalized(language, s.title)}</h2>
                <p className="text-sm text-muted-foreground whitespace-pre-line mb-4">{getLocalized(language, s.content)}</p>
              </section>
            ))}

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
                homeworksKey={`homeworks:office:microsoft-office:${index}`}
                homeworks={moduleData.homeworks}
                language={language}
                labels={{
                  title: t('ui.homeworks'),
                  finish: t('ui.finish'),
                  solution: t('ui.solutionLabel'),
                  solutionFallback: t('ui.solutionFallback'),
                }}
              />
            </section>

            <section id="notes" className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-xl font-bold mb-3">{t('ui.notes')}</h3>
              <textarea
                value={notes[notesKey] ?? ''}
                onChange={(e) => setNote(notesKey, e.target.value)}
                className="w-full min-h-[160px] rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary"
                placeholder={t('ui.notesPlaceholder')}
              />
            </section>
          </div>

          {/* Spacer for sticky footer */}
          <div className="h-20"></div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border p-4 md:px-10 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/platform/office')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline font-medium">Previous Lesson</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={markedComplete}
                  onChange={(e) => {
                    setMarkedComplete(e.target.checked);
                    if (e.target.checked) updateProgress(pctKey, 100);
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer dark:bg-muted peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                <span className="ml-3 text-sm font-medium text-foreground">Mark as Complete</span>
              </label>
            </div>
            <button className="bg-primary text-primary-foreground font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
              Next Lesson
              <ArrowLeft size={16} className="rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

