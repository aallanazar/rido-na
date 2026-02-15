'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { Code2, Terminal, Database, Braces, Palette, Layers, Smartphone, ArrowLeft } from 'lucide-react';
import type { CodingCourseId } from '@/lib/courses/types';
import { getCodingCourseIds } from '@/lib/courses/coding';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-1 pt-20 overflow-hidden">
        {/* Sidebar Roadmap */}
        <aside className="w-72 bg-card border-r border-border hidden lg:flex flex-col overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">Roadmap</h2>
            <div className="relative pl-4 border-l-2 border-border space-y-8">
              <div className="relative group">
                <div className="absolute -left-5.25 top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background"></div>
                <div>
                  <h3 className="text-sm font-semibold text-primary">1. {t('ui.basics')}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{t('ui.foundations')}</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -left-5.25 top-1 h-3 w-3 rounded-full bg-border ring-4 ring-background group-hover:bg-primary transition-colors"></div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground opacity-60">2. {t('ui.advanced')}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{t('ui.logicAndData')}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <header className="mb-12">
              <h1 className="text-5xl font-serif font-bold text-foreground mb-4">{t('subjects.coding')}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{t('ui.codingIntro')}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {ids.map((id) => {
                const Icon = iconFor[id] ?? Code2;
                return (
                  <Card key={id} className="group hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                    <CardHeader className="p-6 pb-2">
                      <div className="flex items-start justify-between">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <Icon size={24} />
                        </div>
                        <Badge variant="secondary" className="bg-primary/5 text-primary text-[10px] uppercase font-bold tracking-widest border-none">
                          {t('ui.popular')}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-2 flex-1">
                      <h3 className="text-2xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {t(`courses.${id}`)}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-6">
                        {t('ui.courseHas15Modules')}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                          20h Kurs
                        </span>
                        <Button asChild variant="outline" size="sm" className="rounded-full px-4">
                          <Link href={`/platform/coding/${id}`}>
                            {t('ui.openModule')}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

