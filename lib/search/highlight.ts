export function findMatchRanges(haystack: string, query: string): Array<{ start: number; end: number }> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const hs = haystack.toLowerCase();
  const ranges: Array<{ start: number; end: number }> = [];

  let from = 0;
  while (from < hs.length) {
    const idx = hs.indexOf(q, from);
    if (idx === -1) break;
    ranges.push({ start: idx, end: idx + q.length });
    from = idx + q.length;
  }
  return ranges;
}

export function mergeRanges(ranges: Array<{ start: number; end: number }>): Array<{ start: number; end: number }> {
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged: Array<{ start: number; end: number }> = [];
  for (const r of sorted) {
    const last = merged[merged.length - 1];
    if (!last || r.start > last.end) merged.push({ ...r });
    else last.end = Math.max(last.end, r.end);
  }
  return merged;
}

