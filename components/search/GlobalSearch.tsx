'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { SearchBox } from './SearchBox';

export function GlobalSearch() {
  const { t, language } = useTranslation();
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    const encoded = encodeURIComponent(query.trim());
    router.push(`/platform/search?q=${encoded}`);
  };

  return (
    <SearchBox
      language={language}
      placeholder={t('ui.globalSearchPlaceholder') || 'Search...'}
      onSearch={handleSearch}
    />
  );
}
