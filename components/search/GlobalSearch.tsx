'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { SearchBox } from './SearchBox';
import { SearchDropdown } from './SearchDropdown';
import { buildSearchItems } from '@/lib/search/buildItems';
import { queryItems } from '@/lib/search/query';
import type { SearchResult } from '@/lib/search/types';

export function GlobalSearch() {
  const { t, language } = useTranslation();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Build search index
  const searchItems = useMemo(() => {
    return buildSearchItems(language);
  }, [language]);

  // Get results based on query
  const results: SearchResult[] = useMemo(() => {
    if (!query.trim()) return [];
    return queryItems(searchItems, query.trim()).slice(0, 8); // Top 8 results
  }, [query, searchItems]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setShowDropdown(false);
    const encoded = encodeURIComponent(searchQuery.trim());
    router.push(`/platform/search?q=${encoded}`);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setShowDropdown(newQuery.trim().length > 0);
  };

  const handlePickResult = () => {
    setQuery('');
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <SearchBox
        language={language}
        placeholder={t('ui.globalSearchPlaceholder') || 'Überall suchen...'}
        onSearch={handleSearch}
        onQueryChange={handleQueryChange}
      />
      
      {/* Search Results Dropdown */}
      {showDropdown && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 pointer-events-auto">
          <SearchDropdown
            query={query}
            results={results}
            onPick={handlePickResult}
            emptyLabel={t('ui.noResults') || 'Keine Ergebnisse gefunden'}
          />
        </div>
      )}
    </div>
  );
}
