import type { SearchFilters, SearchItem, SearchResult } from './types';
import { findMatchRanges, mergeRanges } from './highlight';

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFKD');
}

function scoreItem(haystack: string, queryTokens: string[]): number {
  const hs = normalize(haystack);
  let score = 0;
  for (const token of queryTokens) {
    const idx = hs.indexOf(token);
    if (idx === -1) return -1;
    score += Math.max(0, 100 - idx) + token.length * 3;
  }
  return score;
}

export function runSearch(items: SearchItem[], query: string, filters: SearchFilters = {}): SearchResult[] {
  const q = query.trim();
  if (!q) return [];

  const tokens = normalize(q)
    .split(/\s+/)
    .filter(Boolean);

  const filtered = items.filter((it) => {
    if (filters.subjectId && it.subjectId !== filters.subjectId) return false;
    if (filters.levelId && it.levelId !== filters.levelId) return false;
    if (filters.sectionType && it.sectionType !== filters.sectionType) return false;
    return true;
  });

  const results: SearchResult[] = [];
  for (const it of filtered) {
    const score = scoreItem(it.haystack, tokens);
    if (score < 0) continue;

    const matchRanges = mergeRanges(findMatchRanges(it.title, q));
    results.push({ ...it, score, matchRanges });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 12);
}

// Alias for backward compatibility
export function queryItems(items: SearchItem[], query: string): SearchResult[] {
  return runSearch(items, query);
}

