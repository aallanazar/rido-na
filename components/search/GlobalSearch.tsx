'use client';

import React, { useMemo } from 'react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { SearchBox } from './SearchBox';

const moduleTypes = ['theory', 'examples', 'practice', 'demo', 'video', 'steps', 'interactive', 'exercises', 'visuals', 'quiz', 'worksheets', 'homework', 'materials', 'notes'] as const;

export function GlobalSearch() {
  const { t, language } = useTranslation();

  const subjectLabels = useMemo(() => {
    const ids = ['math', 'physics', 'chemistry', 'biology', 'coding', 'office'] as const;
    return Object.fromEntries(ids.map((id) => [id, t(`subjects.${id}`)])) as Record<string, string>;
  }, [t]);

  const moduleTypeLabels = useMemo(() => {
    return Object.fromEntries(moduleTypes.map((k) => [k, t(`moduleTypes.${k}`)])) as Record<string, string>;
  }, [t]);

  return (
    <SearchBox
      language={language}
      placeholder={t('ui.globalSearchPlaceholder')}
      emptyLabel={t('ui.noResults')}
      showSubjectFilters
      labels={{
        all: t('ui.filterAll'),
        school: t('ui.schoolLevel'),
        university: t('ui.universityLevel'),
        moduleTypes: moduleTypeLabels,
        subjects: subjectLabels,
      }}
    />
  );
}
