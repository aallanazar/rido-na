'use client';

import React from 'react';

export function HighlightText({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;

  const lower = text.toLowerCase();
  const qLower = q.toLowerCase();
  const parts: React.ReactNode[] = [];

  let from = 0;
  while (from < text.length) {
    const idx = lower.indexOf(qLower, from);
    if (idx === -1) {
      parts.push(text.slice(from));
      break;
    }
    if (idx > from) parts.push(text.slice(from, idx));
    parts.push(
      <mark
        key={`${idx}-${qLower}`}
        className="rounded px-1 bg-[#d4a373]/20 text-inherit"
      >
        {text.slice(idx, idx + q.length)}
      </mark>
    );
    from = idx + q.length;
  }

  return <>{parts}</>;
}

