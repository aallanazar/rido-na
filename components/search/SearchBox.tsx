'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export function SearchBox({
  placeholder,
  inputClassName,
  onSearch,
  onQueryChange,
}: {
  placeholder: string;
  emptyLabel?: string;
  scopeSubjectId?: string;
  showSubjectFilters?: boolean;
  labels?: Record<string, string>;
  inputClassName?: string;
  onSearch?: (query: string) => void;
  onQueryChange?: (query: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (onQueryChange) {
      onQueryChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105 origin-center' : 'scale-100'}`}>
        <button
          onClick={handleSearch}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[var(--color-primary)]/10 dark:hover:bg-white/10 transition-all duration-200 text-[var(--color-primary)] hover:scale-110"
        >
          <Search className="w-5 h-5 opacity-70" />
        </button>
        <input
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={
            inputClassName ??
            'w-full bg-white/50 dark:bg-white/5 border border-[var(--color-primary)]/20 dark:border-white/10 rounded-full pl-11 pr-4 py-2.5 text-sm placeholder:opacity-60 hover:bg-white/60 dark:hover:bg-white/8 hover:border-[var(--color-primary)]/40 dark:hover:border-white/15 focus:outline-none focus:bg-white/70 dark:focus:bg-white/10 focus:border-[var(--color-primary)]/60 focus:ring-2 focus:ring-[var(--color-primary)]/30 dark:focus:ring-[var(--color-primary)]/40 transition-all duration-200'
          }
        />
      </div>
    </div>
  );
}
