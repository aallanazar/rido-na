'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, CheckCircle2, ChevronDown, AlertCircle } from 'lucide-react';
import type { CourseHomework } from '@/lib/courses/types';
import type { LanguageCode } from '@/lib/curriculum/types';
import { getLocalized } from '@/lib/curriculum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function HomeworksBlock({
  homeworksKey,
  homeworks,
  language,
  labels,
}: {
  homeworksKey: string;
  homeworks: CourseHomework[];
  language: LanguageCode;
  labels: {
    title: string;
    finish: string; // "Fertig"
    solution: string; // "Lösung"
    solutionFallback: string; // "Lösung folgt bald"
  };
}) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const toggleSolution = (id: string) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card data-homeworks-key={homeworksKey}>
      <CardHeader>
        <CardTitle>{labels.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {homeworks.map((hw) => {
          const isRevealed = revealed[hw.id];
          const solutionText = hw.solution ? getLocalized(language, hw.solution) : null;

          return (
            <div key={hw.id} className="rounded-lg border overflow-hidden bg-muted/50">
              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{getLocalized(language, hw.title)}</div>
                    <div className="text-sm text-muted-foreground mt-1 leading-relaxed whitespace-pre-wrap">
                      {getLocalized(language, hw.description)}
                    </div>
                  </div>
                </div>

                {!isRevealed && (
                  <Button
                    onClick={() => toggleSolution(hw.id)}
                    className="w-full mt-2 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} />
                    {labels.finish || 'Fertig'}
                  </Button>
                )}
              </div>

              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-t bg-primary/5"
                  >
                    <div className="p-5">
                      <div className="flex items-center gap-2 font-serif font-bold text-primary mb-3">
                        <ChevronDown size={18} />
                        {labels.solution || 'Lösung'}
                      </div>

                      <div className="bg-background rounded-lg p-4 text-sm leading-relaxed border">
                        {solutionText ? (
                          <div className="whitespace-pre-wrap">{solutionText}</div>
                        ) : (
                          <div className="flex items-center gap-2 text-muted-foreground italic">
                            <AlertCircle size={16} />
                            {labels.solutionFallback || 'Lösung folgt bald'}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

