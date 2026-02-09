import type { LocalizedString, QuizQuestion } from '@/lib/curriculum/types';

export type CourseGroupId = 'coding' | 'office';

export type CodingCourseId =
  | 'python'
  | 'java'
  | 'csharp'
  | 'c'
  | 'cpp'
  | 'go'
  | 'javascript'
  | 'typescript'
  | 'css'
  | 'react'
  | 'react-native'
  | 'sql'
  | 'nosql'
  | 'linux';

export type OfficeCourseId = 'microsoft-office';

export type CourseId = CodingCourseId | OfficeCourseId;

export type CourseFeature = 'code-editor' | 'live-preview' | 'terminal';

export type CourseSectionType =
  | 'theory'
  | 'practice'
  | 'demo'
  | 'video'
  | 'steps'
  | 'interactive'
  | 'quiz'
  | 'homework'
  | 'notes'
  | 'materials';

export type CourseSection = {
  type: CourseSectionType;
  title: LocalizedString;
  content: LocalizedString;
};

export type CourseMaterial = {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
  downloadUrl?: string;
};

export type CourseHomework = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
};

export type CourseModule = {
  index: number; // 1..15
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  sections: CourseSection[];
  quizTitle: LocalizedString;
  quiz: QuizQuestion[]; // exactly 10 (mcq)
  homeworks: CourseHomework[]; // 2..3
  materials: CourseMaterial[];
};

export type Course = {
  group: CourseGroupId;
  id: CourseId;
  title: LocalizedString;
  description: LocalizedString;
  features: CourseFeature[];
  modules: CourseModule[];
  minScoreToUnlockNext: number;
};

