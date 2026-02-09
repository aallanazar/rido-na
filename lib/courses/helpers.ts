import type { LocalizedString, QuizQuestion } from '@/lib/curriculum/types';
import type { CourseHomework, CourseMaterial } from './types';

export const ls = (uz: string, de: string, en: string): LocalizedString => ({ uz, de, en });

export function makeQuiz10(params: {
  prefix: string;
  basePrompt: LocalizedString;
  choices: LocalizedString[];
  correctIndex: number;
  explanation?: LocalizedString;
}): QuizQuestion[] {
  const q: QuizQuestion[] = [];

  q.push({
    id: `${params.prefix}-q1`,
    type: 'mcq',
    prompt: params.basePrompt,
    choices: params.choices,
    correctIndex: params.correctIndex,
    explanation: params.explanation,
  });

  for (let i = 2; i <= 10; i += 1) {
    q.push({
      id: `${params.prefix}-q${i}`,
      type: 'mcq',
      prompt: ls('Platzhalter-Frage', 'Platzhalter-Frage', 'Placeholder question'),
      choices: [ls('A', 'A', 'A'), ls('B', 'B', 'B'), ls('C', 'C', 'C'), ls('D', 'D', 'D')],
      correctIndex: 0,
      explanation: ls('Wird ergänzt…', 'Wird ergänzt…', 'To be added…'),
    });
  }

  return q;
}

export function makeHomeworks(params: { prefix: string; count: 2 | 3 }): CourseHomework[] {
  const list: CourseHomework[] = [];
  for (let i = 1; i <= params.count; i += 1) {
    list.push({
      id: `${params.prefix}-hw${i}`,
      title: ls(`Uy vazifasi ${i}`, `Hausaufgabe ${i}`, `Homework ${i}`),
      description: ls('Wird ergänzt…', 'Wird ergänzt…', 'To be added…'),
    });
  }
  return list;
}

export function makeMaterials(params: { prefix: string; count: 2 | 3 }): CourseMaterial[] {
  const list: CourseMaterial[] = [];
  for (let i = 1; i <= params.count; i += 1) {
    list.push({
      id: `${params.prefix}-mat${i}`,
      title: ls(`Material ${i}`, `Material ${i}`, `Material ${i}`),
      description: ls('Download wird ergänzt…', 'Download wird ergänzt…', 'Download will be added…'),
    });
  }
  return list;
}

