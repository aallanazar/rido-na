'use client';

import React, { useState } from 'react';
import type { LanguageCode, Worksheet } from '@/lib/curriculum/types';
import { getLocalized } from '@/lib/curriculum';
import { FileText, Download, CheckCircle2, ChevronDown, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function WorksheetsBlock({
  worksheetsKey,
  worksheets,
  language,
  labels,
}: {
  worksheetsKey: string;
  worksheets: Worksheet[];
  language: LanguageCode;
  labels: {
    title: string;
    download: string;
    finish: string;
    solution: string;
    solutionFallback: string;
  };
}) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const toggleSolution = (id: string) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card data-worksheets-key={worksheetsKey}>
      <CardHeader>
        <CardTitle>{labels.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {worksheets.map((ws) => {
          const wsTitle = getLocalized(language, ws.title);
          const wsDescription = ws.description ? getLocalized(language, ws.description) : undefined;
          const isRevealed = revealed[ws.id];
          const solutionText = ws.solution ? getLocalized(language, ws.solution) : null;

          return (
            <div key={ws.id} className="rounded-lg border overflow-hidden bg-muted/50">
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{wsTitle}</div>
                      {wsDescription ? <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{wsDescription}</div> : null}
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={!ws.downloadUrl}
                    onClick={() => {
                      if (!ws.downloadUrl) return;
                      window.open(ws.downloadUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="shrink-0 flex items-center gap-2"
                  >
                    <Download size={14} />
                    {labels.download}
                  </Button>
                </div>

                {!isRevealed && (
                  <Button
                    onClick={() => toggleSolution(ws.id)}
                    className="w-full mt-4 flex items-center justify-center gap-2"
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

