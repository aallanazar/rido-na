'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { Code2, Terminal, Database, Braces, Palette, Layers, Smartphone, ArrowLeft } from 'lucide-react';
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
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-72 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark hidden lg:flex flex-col overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Learning Roadmap</h2>
          <div className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-6">
            <div className="relative group">
              <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-white dark:ring-surface-dark"></div>
              <a className="block" href="#">
                <h3 className="text-sm font-semibold text-primary">1. Einführung</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Grundlagen der Programmierung</p>
              </a>
            </div>
            {/* Add more roadmap items here */}
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('subjects.coding')}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t('ui.codingIntro')}</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ids.map((id) => {
              const Icon = iconFor[id] ?? Code2;
              return (
                <Link
                  key={id}
                  href={`/platform/coding/${id}`}
                  className="group block bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-accent-blue rounded-xl text-blue-500 dark:text-blue-400">
                      <Icon size={22} />
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">Beliebt</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{t(`courses.${id}`)}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2">{t('ui.courseHas15Modules')}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                      <span className="material-icons-outlined text-sm">schedule</span> 20h Kurs
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                      <span className="material-icons-outlined text-sm">bar_chart</span> Einfach
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

