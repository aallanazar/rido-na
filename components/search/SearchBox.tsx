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
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <Search className="w-4 h-4 opacity-50" />
        </button>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={
            inputClassName ??
            'w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#d4a373]/60 transition-colors'
          }
        />
      </div>
    </div>
  );
}
