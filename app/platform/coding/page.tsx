'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { Code2, Terminal, Database, Braces, Palette, Layers, Smartphone } from 'lucide-react';
import type { CodingCourseId } from '@/lib/courses/types';
import { getCodingCourseIds } from '@/lib/courses/coding';

const iconFor: Record<CodingCourseId, React.ComponentType<{ size?: number }>> = {
  python: Code2,
  java: Code2,
  csharp: Code2,
  c: Code2,
  cpp: Code2,
  go: Code2,
  javascript: Braces,
  typescript: Braces,
  css: Palette,
  react: Layers,
  'react-native': Smartphone,
  sql: Database,
  nosql: Database,
  linux: Terminal,
};

export default function CodingHome() {
  const { t } = useTranslation();
  const ids = getCodingCourseIds();

  return (
    <main className="min-h-screen p-8 pt-28 bg-[#fdfbf7] dark:bg-[#1a1a1a] notebook-lines">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-5xl font-serif font-bold">{t('subjects.coding')}</h1>
          <p className="mt-3 opacity-70">{t('ui.codingIntro')}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ids.map((id) => {
            const Icon = iconFor[id] ?? Code2;
            return (
              <Link
                key={id}
                href={`/platform/coding/${id}`}
                className="p-7 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow block"
              >
                <div className="flex items-center gap-3 text-[#d4a373] mb-3">
                  <Icon size={22} />
                  <span className="text-sm font-bold tracking-wider uppercase">{t(`courses.${id}`)}</span>
                </div>
                <div className="text-xl font-serif font-bold mb-2">{t('ui.openCourse')}</div>
                <p className="text-sm opacity-70">{t('ui.courseHas15Modules')}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

