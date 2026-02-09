'use client';

import React from 'react';

type Props = {
  levelId?: string;
  subjectId?: string;
  sectionType?: string;
  onChange: (next: { levelId?: string; subjectId?: string; sectionType?: string }) => void;
  labels: {
    all: string;
    school: string;
    university: string;
    moduleTypes: Record<string, string>;
    subjects?: Record<string, string>;
  };
  showSubjects?: boolean;
  typeOrder?: string[];
};

const defaultTypeOrder = [
  'theory',
  'examples',
  'practice',
  'demo',
  'video',
  'steps',
  'interactive',
  'exercises',
  'visuals',
  'quiz',
  'worksheets',
  'homework',
  'materials',
  'notes',
];

export function SearchFiltersBar({ levelId, subjectId, sectionType, onChange, labels, showSubjects }: Props) {
  const typeOrder = defaultTypeOrder;
  const ordered = typeOrder.filter((k) => k in labels.moduleTypes);

  const chip = (active: boolean) =>
    `text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
      active
        ? 'bg-black text-white dark:bg-white dark:text-black border-black/10 dark:border-white/10'
        : 'bg-transparent border-black/10 dark:border-white/10 hover:bg-black/[0.03] dark:hover:bg-white/[0.05]'
    }`;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <button className={chip(!levelId)} onClick={() => onChange({ levelId: undefined, subjectId, sectionType })} type="button">
        {labels.all}
      </button>
      <button className={chip(levelId === 'school')} onClick={() => onChange({ levelId: 'school', subjectId, sectionType })} type="button">
        {labels.school}
      </button>
      <button
        className={chip(levelId === 'university')}
        onClick={() => onChange({ levelId: 'university', subjectId, sectionType })}
        type="button"
      >
        {labels.university}
      </button>

      {showSubjects && labels.subjects ? (
        <div className="flex flex-wrap items-center gap-2 ml-2">
          {Object.keys(labels.subjects).map((id) => (
            <button
              key={id}
              className={chip(subjectId === id)}
              onClick={() => onChange({ levelId, subjectId: subjectId === id ? undefined : id, sectionType })}
              type="button"
            >
              {labels.subjects?.[id] ?? id}
            </button>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 ml-2">
        {ordered.map((t) => (
          <button
            key={t}
            className={chip(sectionType === t)}
            onClick={() => onChange({ levelId, subjectId, sectionType: sectionType === t ? undefined : t })}
            type="button"
          >
            {labels.moduleTypes[t]}
          </button>
        ))}
      </div>
    </div>
  );
}
