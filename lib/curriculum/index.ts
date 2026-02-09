import type { Curriculum, LanguageCode, LevelId, LocalizedString, Module, Subject, SubjectId } from './types';
import { scienceCurriculum } from './science';

export { scienceCurriculum };
export type { Curriculum, LanguageCode, LevelId, LocalizedString, Module, Subject, SubjectId };

export const curriculum: Curriculum = scienceCurriculum;

export function isScienceSubject(subjectId: string): subjectId is SubjectId {
  return subjectId === 'math' || subjectId === 'physics' || subjectId === 'chemistry' || subjectId === 'biology';
}

export function getLocalized(language: LanguageCode, value: LocalizedString): string {
  return value[language] ?? value.en;
}

export function getSubject(subjectId: SubjectId): Subject {
  return curriculum.subjects[subjectId];
}

