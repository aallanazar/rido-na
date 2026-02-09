import type { ModuleSectionType } from '@/lib/curriculum/types';

export type SearchItemKind = 'subject' | 'course' | 'module' | 'section' | 'quiz' | 'worksheet' | 'homework' | 'material';

export type SearchItem = {
  id: string;
  kind: SearchItemKind;
  title: string;
  snippet?: string;
  subjectId?: string;
  subjectTitle?: string;
  levelId?: string;
  levelTitle?: string;
  moduleId?: string;
  moduleTitle?: string;
  sectionType?: ModuleSectionType | string;
  href: string;
  haystack: string;
};

export type SearchFilters = {
  subjectId?: string;
  levelId?: string;
  sectionType?: ModuleSectionType | string;
};

export type SearchResult = SearchItem & { score: number; matchRanges: Array<{ start: number; end: number }> };
