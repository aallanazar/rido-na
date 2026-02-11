'use client';

import React, { useState } from 'react';
import type { LanguageCode, Worksheet } from '@/lib/curriculum/types';
import { getLocalized } from '@/lib/curriculum';
import { FileText, Download, CheckCircle2, ChevronDown, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
      <h3 className="text-xl font-serif font-bold mb-6">{labels.title}</h3>

      <div className="space-y-6">
        {worksheets.map((ws) => {
          const wsTitle = getLocalized(language, ws.title);
          const wsDescription = ws.description ? getLocalized(language, ws.description) : undefined;
          const isRevealed = revealed[ws.id];
          const solutionText = ws.solution ? getLocalized(language, ws.solution) : null;

          return (
            <div key={ws.id} className="rounded-xl border border-black/5 dark:border-white/10 overflow-hidden bg-white/50 dark:bg-black/20">
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#d4a373]/10 flex items-center justify-center text-[#d4a373] shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{wsTitle}</div>
                      {wsDescription ? <div className="text-sm opacity-70 mt-1 leading-relaxed">{wsDescription}</div> : null}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      className="text-xs font-semibold px-3 py-2 rounded-full border border-black/10 dark:border-white/10 disabled:opacity-40 flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      disabled={!ws.downloadUrl}
                      onClick={() => {
                        if (!ws.downloadUrl) return;
                        window.open(ws.downloadUrl, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      <Download size={14} />
                      {labels.download}
                    </button>
                  </div>
                </div>

                {!isRevealed && (
                  <button
                    onClick={() => toggleSolution(ws.id)}
                    className="w-full mt-4 py-3 px-4 rounded-xl bg-[#d4a373] text-black font-semibold hover:bg-[#c9935f] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} />
                    {labels.finish || 'Fertig'}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-t border-black/5 dark:border-white/5 bg-[#d4a373]/5"
                  >
                    <div className="p-5">
                      <div className="flex items-center gap-2 font-serif font-bold text-[#d4a373] mb-3">
                        <ChevronDown size={18} />
                        {labels.solution || 'Lösung'}
                      </div>

                      <div className="bg-white dark:bg-black/20 rounded-lg p-4 text-sm leading-relaxed border border-black/5 dark:border-white/5">
                        {solutionText ? (
                          <div className="whitespace-pre-wrap">{solutionText}</div>
                        ) : (
                          <div className="flex items-center gap-2 opacity-60 italic">
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
      </div>
    </div>
  );
}

