'use client';

import React from 'react';
import type { CourseMaterial } from '@/lib/courses/types';
import type { LanguageCode } from '@/lib/curriculum/types';
import { getLocalized } from '@/lib/curriculum';
import { Download, Package } from 'lucide-react';

export function MaterialsBlock({
  title,
  materials,
  language,
  labels,
}: {
  title: string;
  materials: CourseMaterial[];
  language: LanguageCode;
  labels: { download: string };
}) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Package size={18} className="text-[#d4a373]" />
        <h3 className="text-xl font-serif font-bold">{title}</h3>
      </div>
      <div className="space-y-3">
        {materials.map((m) => (
          <div key={m.id} className="rounded-xl border border-black/5 dark:border-white/10 p-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold">{getLocalized(language, m.title)}</div>
              {m.description ? <div className="text-xs opacity-70 mt-1">{getLocalized(language, m.description)}</div> : null}
            </div>
            <button
              type="button"
              disabled={!m.downloadUrl}
              onClick={() => {
                if (!m.downloadUrl) return;
                window.open(m.downloadUrl, '_blank', 'noopener,noreferrer');
              }}
              className="text-xs font-semibold px-3 py-2 rounded-full border border-black/10 dark:border-white/10 disabled:opacity-40 flex items-center gap-2"
            >
              <Download size={14} />
              {labels.download}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

