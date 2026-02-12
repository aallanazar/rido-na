'use client';

import React from 'react';
import Link from 'next/link';
import type { SearchResult } from '@/lib/search/types';
import { HighlightText } from './HighlightText';
import { BookOpen, Code, FileText, HelpCircle, FileSpreadsheet } from 'lucide-react';

const kindIcons: Record<string, React.ReactNode> = {
  subject: <BookOpen size={16} />,
  module: <BookOpen size={16} />,
  section: <FileText size={16} />,
  theory: <FileText size={16} />,
  examples: <Code size={16} />,
  exercises: <Code size={16} />,
  quiz: <HelpCircle size={16} />,
  course: <BookOpen size={16} />,
  material: <FileSpreadsheet size={16} />,
  homework: <FileSpreadsheet size={16} />,
};

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
    <div className="absolute left-0 right-0 mt-3 rounded-2xl bg-white dark:bg-[#1f1f1f] border-2 border-[var(--color-primary)]/20 dark:border-white/10 shadow-2xl overflow-hidden backdrop-blur-sm">
      {results.length === 0 ? (
        <div className="px-6 py-8 text-center">
          <div className="text-sm opacity-60 mb-2">{emptyLabel}</div>
          <div className="text-xs opacity-40">Suche überall auf der Platform...</div>
        </div>
      ) : (
        <>
          <div className="px-6 py-3 bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 dark:from-[var(--color-primary)]/10 dark:to-[var(--color-secondary)]/10 border-b border-[var(--color-primary)]/10">
            <div className="text-xs font-semibold opacity-70 uppercase tracking-wide">
              {results.length} Ergebnis{results.length !== 1 ? 'se' : ''}
            </div>
          </div>
          <ul className="max-h-[500px] overflow-auto">
            {results.map((r, idx) => (
              <li key={r.id} className={`${idx !== results.length - 1 ? 'border-b border-black/5 dark:border-white/5' : ''}`}>
                <Link
                  href={r.href}
                  onClick={onPick}
                  className="flex items-start gap-3 px-6 py-4 hover:bg-gradient-to-r hover:from-[var(--color-primary)]/5 hover:to-transparent dark:hover:from-[var(--color-primary)]/10 hover:to-transparent transition-all duration-200 group"
                >
                  <div className="mt-1 text-[var(--color-primary)] dark:text-[var(--color-primary-light)] opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    {kindIcons[r.kind as string] || <BookOpen size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold group-hover:text-[var(--color-primary)] dark:group-hover:text-[var(--color-primary-light)] transition-colors">
                      <HighlightText text={r.title} query={query} />
                    </div>
                    <div className="text-xs opacity-50 mt-1 truncate">
                      {r.subjectTitle}
                      {r.levelTitle ? ` · ${r.levelTitle}` : ''}
                      {r.moduleTitle ? ` · ${r.moduleTitle}` : ''}
                    </div>
                    {r.snippet ? (
                      <div className="text-xs opacity-60 mt-2 line-clamp-2">
                        <HighlightText text={r.snippet} query={query} />
                      </div>
                    ) : null}
                  </div>
                  <div className="text-xs opacity-40 flex-shrink-0 ml-2">
                    {r.kind === 'subject' && '📚'}
                    {r.kind === 'module' && '📖'}
                    {r.kind === 'section' && '📄'}
                    {r.kind === 'quiz' && '❓'}
                    {r.kind === 'course' && '🎓'}
                    {r.kind === 'material' && '📎'}
                    {r.kind === 'homework' && '✏️'}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
