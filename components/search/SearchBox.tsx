'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { LanguageCode } from '@/lib/curriculum/types';

export function SearchBox({
  language,
  placeholder,
  inputClassName,
  onSearch,
}: {
  language: LanguageCode;
  placeholder: string;
  emptyLabel?: string;
  scopeSubjectId?: string;
  showSubjectFilters?: boolean;
  labels?: any;
  inputClassName?: string;
  onSearch?: (query: string) => void;
}) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <button
          onClick={handleSearch}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[var(--color-primary)]/10 dark:hover:bg-white/10 transition-colors text-[var(--color-primary)]"
        >
          <Search className="w-4 h-4 opacity-70" />
        </button>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={
            inputClassName ??
            'w-full bg-white/50 dark:bg-white/5 border border-[var(--color-primary)]/20 dark:border-white/10 rounded-full pl-10 pr-4 py-2 text-sm placeholder:opacity-60 focus:outline-none focus:border-[var(--color-primary)]/60 focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:focus:ring-[var(--color-primary)]/30 transition-all duration-200'
          }
        />
      </div>
    </div>
  );
}
