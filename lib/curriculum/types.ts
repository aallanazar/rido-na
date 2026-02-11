export type LanguageCode = 'uz' | 'de' | 'en';

export type SubjectId = 'math' | 'physics' | 'chemistry' | 'biology';
export type LevelId = 'school' | 'university';

export type ModuleSectionType =
  | 'theory'
  | 'examples'
  | 'exercises'
  | 'visuals'
  | 'quiz'
  | 'worksheets'
  | 'practice';

export type LocalizedString = Record<LanguageCode, string>;

export type QuizQuestion =
  | {
    id: string;
    type: 'mcq';
    prompt: LocalizedString;
    choices: LocalizedString[];
    correctIndex: number;
    solution?: LocalizedString;
    explanation?: LocalizedString;
  }
  | {
    id: string;
    type: 'open';
    prompt: LocalizedString;
    correctAnswer: { type: 'number'; value: number; tolerance?: number } | { type: 'text'; value: string };
    solution?: LocalizedString;
    explanation?: LocalizedString;
  };

export type Worksheet = {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
  downloadUrl?: string;
  solution?: LocalizedString;
  explanation?: LocalizedString;
};

export type ModuleSection = {
  type: ModuleSectionType;
  title: LocalizedString;
  content: LocalizedString;
};

export type Module = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  sections: ModuleSection[];
  quizTitle: LocalizedString;
  quiz: QuizQuestion[];
  worksheets: Worksheet[];
};

export type Level = {
  id: LevelId;
  title: LocalizedString;
  modules: Module[];
};

export type Subject = {
  id: SubjectId;
  title: LocalizedString;
  levels: Record<LevelId, Level>;
};

export type Curriculum = {
  subjects: Record<SubjectId, Subject>;
};
