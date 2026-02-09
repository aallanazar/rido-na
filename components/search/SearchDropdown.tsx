'use client';

import React from 'react';
import Link from 'next/link';
import type { SearchResult } from '@/lib/search/types';
import { HighlightText } from './HighlightText';

export function SearchDropdown({
  query,
  results,
  onPick,
  emptyLabel,
}: {
  query: string;
  results: SearchResult[];
  onPick?: () => void;
  emptyLabel: string;
}) {
  return (
    <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 shadow-xl overflow-hidden">
      {results.length === 0 ? (
        <div className="px-4 py-3 text-sm opacity-60">{emptyLabel}</div>
      ) : (
        <ul className="max-h-[420px] overflow-auto">
          {results.map((r) => (
            <li key={r.id} className="border-t border-black/5 dark:border-white/5 first:border-t-0">
              <Link
                href={r.href}
                onClick={onPick}
                className="block px-4 py-3 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-colors"
              >
                <div className="text-sm font-semibold">
                  <HighlightText text={r.title} query={query} />
                </div>
                <div className="text-xs opacity-60 mt-0.5">
                  {r.subjectTitle}
                  {r.levelTitle ? ` · ${r.levelTitle}` : ''}
                  {r.moduleTitle ? ` · ${r.moduleTitle}` : ''}
                </div>
                {r.snippet ? (
                  <div className="text-xs opacity-70 mt-1">
                    <HighlightText text={r.snippet} query={query} />
                  </div>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
