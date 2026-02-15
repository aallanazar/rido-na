'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { buildOfficeCourse } from '@/lib/courses/office';
import { FileText, Sheet, Presentation, Lock, Award } from 'lucide-react';
import { usePlatformStore } from '@/lib/store/usePlatformStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function OfficeHome() {
  const { t } = useTranslation();
  const course = useMemo(() => buildOfficeCourse(), []);
  const { quiz, progress } = usePlatformStore();

  const minScore = course.minScoreToUnlockNext;
  const passed = course.modules.map((m) => {
    const key = `quiz:office:microsoft-office:${m.index}`;
    const s = quiz[key]?.score;
    return typeof s === 'number' ? s >= minScore : false;
  });
  const eligibleCertificate = passed.length === 15 && passed.every(Boolean);

  return (
    <main className="min-h-screen p-8 pt-28 bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-5xl font-serif font-bold">{t('subjects.office')}</h1>
          <p className="mt-3 text-muted-foreground">{t('ui.officeIntro')}</p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FileText size={24} className="text-primary" />
              <Sheet size={24} className="text-primary" />
              <Presentation size={24} className="text-primary" />
              <span className="text-sm font-bold tracking-wider uppercase">{t('ui.officeModules')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{t('ui.courseHas15Modules')}</p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{t('ui.minScoreToUnlock', { score: String(minScore) })}</Badge>
              {eligibleCertificate ? (
                <Button asChild variant="outline" size="sm">
                  <Link href="/platform/office/certificate" className="flex items-center gap-2">
                    <Award size={14} />
                    {t('ui.openCertificate')}
                  </Link>
                </Button>
              ) : (
                <Badge variant="secondary">{t('ui.certificateLocked')}</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.modules.map((m) => {
            const locked = m.index > 1 && !passed[m.index - 2];
            const quizKey = `quiz:office:microsoft-office:${m.index}`;
            const score = quiz[quizKey]?.score;
            const pctKey = `courseModule:office:microsoft-office:${m.index}`;
            const pct = Math.max(0, Math.min(100, progress[pctKey] ?? 0));

            return locked ? (
              <Card key={m.id} className="opacity-60">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold">{t('ui.moduleNumber', { n: String(m.index) })}</div>
                    <Lock size={16} className="text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{t('ui.lockedUntilPass')}</div>
                </CardContent>
              </Card>
            ) : (
              <Button
                key={m.id}
                asChild
                variant="outline"
                className="h-auto flex flex-col items-start justify-start p-6"
              >
                <Link href={`/platform/office/${m.index}`}>
                  <div className="w-full">
                    <div className="text-xs font-semibold text-muted-foreground">
                      {t('ui.moduleNumber', { n: String(m.index) })}
                      {typeof score === 'number' ? ` · ${t('ui.points')}: ${score}/10` : ''}
                    </div>
                    <div className="font-bold mt-1">{t('ui.openModule')}</div>
                    <div className="text-sm text-muted-foreground mt-2">{t('ui.moduleIncludes')}</div>
                    <div className="mt-4 w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
