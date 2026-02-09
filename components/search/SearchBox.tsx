'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import type { LanguageCode } from '@/lib/curriculum/types';
import type { SearchFilters } from '@/lib/search/types';
import { buildSearchItems } from '@/lib/search/buildItems';
import { runSearch } from '@/lib/search/query';
import { SearchDropdown } from './SearchDropdown';
import { SearchFiltersBar } from './SearchFiltersBar';

export function SearchBox({
  language,
  placeholder,
  emptyLabel,
  scopeSubjectId,
  showSubjectFilters,
  labels,
  inputClassName,
}: {
  language: LanguageCode;
  placeholder: string;
  emptyLabel: string;
  scopeSubjectId?: string;
  showSubjectFilters?: boolean;
  labels: Parameters<typeof SearchFiltersBar>[0]['labels'];
  inputClassName?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(() =>
    scopeSubjectId ? { subjectId: scopeSubjectId } : {}
  );

  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setOpen(false);
    }
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, []);

  const items = useMemo(() => buildSearchItems(language), [language]);
  const effectiveFilters = useMemo<SearchFilters>(
    () => ({ ...filters, subjectId: scopeSubjectId ?? filters.subjectId }),
    [filters, scopeSubjectId]
  );
  const results = useMemo(() => runSearch(items, query, effectiveFilters), [items, query, effectiveFilters]);

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className={
            inputClassName ??
            'w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#d4a373]/60 transition-colors'
          }
        />
      </div>

      <SearchFiltersBar
        levelId={effectiveFilters.levelId}
        subjectId={effectiveFilters.subjectId}
        sectionType={effectiveFilters.sectionType}
        onChange={(next) => setFilters(scopeSubjectId ? { ...next, subjectId: scopeSubjectId } : next)}
        labels={labels}
        showSubjects={showSubjectFilters}
      />

      {open && query.trim().length > 0 ? (
        <SearchDropdown
          query={query}
          results={results}
          emptyLabel={emptyLabel}
          onPick={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}
