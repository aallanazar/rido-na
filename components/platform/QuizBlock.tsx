'use client';

import React, { useMemo } from 'react';
import type { LanguageCode, QuizQuestion } from '@/lib/curriculum/types';
import { getLocalized } from '@/lib/curriculum';
import { usePlatformStore } from '@/lib/store/usePlatformStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function isCorrect(question: QuizQuestion, rawAnswer: string): boolean {
  if (!rawAnswer.trim()) return false;
  if (question.type === 'mcq') return String(question.correctIndex) === rawAnswer;

  const answer = rawAnswer.trim();
  if (question.correctAnswer.type === 'text') {
    return answer.toLowerCase() === question.correctAnswer.value.trim().toLowerCase();
  }
  const num = Number(answer.replace(',', '.'));
  if (!Number.isFinite(num)) return false;
  const tol = question.correctAnswer.tolerance ?? 0;
  return Math.abs(num - question.correctAnswer.value) <= tol;
}

export function QuizBlock({
  quizKey,
  title,
  questions,
  language,
  labels,
  onEvaluate,
}: {
  quizKey: string;
  title: string;
  questions: QuizQuestion[];
  language: LanguageCode;
  labels: {
    points: string;
    evaluate: string;
    showSolutions: string;
    hideSolutions: string;
    correct: string;
    wrong: string;
    unanswered: string;
  };
  onEvaluate?: (score: number) => void;
}) {
  const { quiz, setQuizAnswer, setQuizScore, setQuizShowSolutions } = usePlatformStore();
  const state = quiz[quizKey] ?? { answers: {}, showSolutions: false as const };

  const total = questions.length;

  const score = useMemo(() => {
    let s = 0;
    for (const q of questions) {
      const ans = state.answers[q.id] ?? '';
      if (isCorrect(q, ans)) s += 1;
    }
    return s;
  }, [questions, state.answers]);

  const answeredCount = useMemo(
    () => questions.filter((q) => (state.answers[q.id] ?? '').trim().length > 0).length,
    [questions, state.answers]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              {labels.points}: {score}/{total} · {answeredCount}/{total}
              {typeof state.score === 'number' ? ` · ${labels.evaluate}: ${state.score}/${total}` : ''}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={() => setQuizShowSolutions(quizKey, !state.showSolutions)}
              variant="outline"
              size="sm"
            >
              {state.showSolutions ? labels.hideSolutions : labels.showSolutions}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setQuizScore(quizKey, score);
                onEvaluate?.(score);
              }}
              size="sm"
            >
              {labels.evaluate}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((q, idx) => {
          const answer = state.answers[q.id] ?? '';
          const hasAnswer = answer.trim().length > 0;
          const ok = hasAnswer ? isCorrect(q, answer) : undefined;
          const statusLabel = !hasAnswer ? labels.unanswered : ok ? labels.correct : labels.wrong;
          const statusColor =
            !hasAnswer ? 'text-muted-foreground' : ok ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500';

          return (
            <div key={q.id} className="rounded-lg border p-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="text-sm font-semibold">
                  {idx + 1}. {getLocalized(language, q.prompt)}
                </div>
                <div className={`text-xs font-semibold ${statusColor}`}>{statusLabel}</div>
              </div>

              {q.type === 'mcq' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {q.choices.map((c, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-md border border-input hover:bg-muted cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={String(i)}
                        checked={answer === String(i)}
                        onChange={(e) => setQuizAnswer(quizKey, q.id, e.target.value)}
                      />
                      <span className="text-sm">{getLocalized(language, c)}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <Input
                  value={answer}
                  onChange={(e) => setQuizAnswer(quizKey, q.id, e.target.value)}
                  placeholder="…"
                />
              )}

              {!ok && hasAnswer && q.explanation ? (
                <div className="mt-3 text-xs text-muted-foreground">
                  <span className="font-semibold">Why: </span>
                  {getLocalized(language, q.explanation)}
                </div>
              ) : null}

              {state.showSolutions && q.solution ? (
                <div className="mt-3 text-xs text-muted-foreground">
                  <span className="font-semibold">Solution: </span>
                  {getLocalized(language, q.solution)}
                </div>
              ) : null}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
