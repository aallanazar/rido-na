'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { languageCourses } from '@/lib/i18n/courses';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function LanguageCoursePage() {
  const params = useParams();
  const target = params.target as string;
  const router = useRouter();
  const { t, language } = useTranslation();

  const course = useMemo(() => {
    const byTarget = languageCourses[target];
    if (!byTarget) return null;
    return byTarget[language] ?? byTarget.en ?? byTarget.de ?? byTarget.uz ?? null;
  }, [target, language]);

  return (
    <main className="min-h-screen p-8 pt-28 bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors -ml-4"
        >
          <ArrowLeft size={20} />
          <span>{t('ui.backToSelection')}</span>
        </Button>

        {!course ? (
          <Card className="p-8">
            <p className="text-muted-foreground">{t('ui.comingSoon')}</p>
          </Card>
        ) : (
          <>
            <header className="mb-12">
              <h1 className="text-6xl font-serif font-bold mb-4 tracking-tight">{course.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{course.description}</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">{t('languageCourse.vocabulary')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {course.vocabulary.map((v) => (
                      <li key={v.word} className="pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className="font-bold text-lg">{v.word}</div>
                        <div className="text-primary italic">{v.translation}</div>
                        <div className="text-xs text-muted-foreground mt-1">{v.pronunciation}</div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">{t('languageCourse.grammar')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-bold mb-3 text-lg">{course.grammar.title}</div>
                  <div className="bg-muted/30 p-4 rounded-lg text-sm leading-relaxed prose prose-sm dark:prose-invert">
                    {course.grammar.content}
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
