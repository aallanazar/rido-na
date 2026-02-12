'use client';

import React, { useMemo } from 'react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import type { SubjectId } from '@/lib/curriculum/types';
import { SearchBox } from './SearchBox';

const moduleTypes = ['theory', 'examples', 'practice', 'demo', 'video', 'steps', 'interactive', 'exercises', 'visuals', 'quiz', 'worksheets', 'homework', 'materials', 'notes'] as const;

export function SubjectSearch({ subjectId }: { subjectId: SubjectId }) {
  const { t } = useTranslation();

  const moduleTypeLabels = useMemo(() => {
    return Object.fromEntries(moduleTypes.map((k) => [k, t(`moduleTypes.${k}`)])) as Record<string, string>;
  }, [t]);

  return (
    <SearchBox
      placeholder={t('ui.searchPlaceholder')}
      labels={{
        all: t('ui.filterAll'),
        school: t('ui.schoolLevel'),
        university: t('ui.universityLevel'),
        moduleTypes: moduleTypeLabels,
      }}
      inputClassName="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#d4a373]/50 transition-colors"
    />
  );
}
