'use client';

import React from 'react';
import type { LanguageCode, Worksheet } from '@/lib/curriculum/types';
import { getLocalized } from '@/lib/curriculum';
import { usePlatformStore } from '@/lib/store/usePlatformStore';
import { Upload, FileText, Download } from 'lucide-react';

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
    onlineEdit: string;
    upload: string;
    teacherFeedback: string;
    placeholder: string;
  };
}) {
  const {
    worksheets: store,
    setWorksheetOnlineText,
    addWorksheetUpload,
    setTeacherFeedback,
  } = usePlatformStore();
  const state = store[worksheetsKey] ?? { uploads: {} };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
      <h3 className="text-xl font-serif font-bold mb-4">{labels.title}</h3>

      <div className="space-y-4">
        {worksheets.map((ws) => {
          const wsTitle = getLocalized(language, ws.title);
          const wsDescription = ws.description ? getLocalized(language, ws.description) : undefined;
          const uploads = state.uploads?.[ws.id] ?? [];
          return (
            <div key={ws.id} className="rounded-xl border border-black/5 dark:border-white/10 p-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d4a373]/10 flex items-center justify-center text-[#d4a373]">
                    <FileText size={18} />
                  </div>
                  <div>
                    <div className="font-semibold">{wsTitle}</div>
                    {wsDescription ? <div className="text-xs opacity-60 mt-1">{wsDescription}</div> : null}
                    {uploads.length ? (
                      <div className="text-xs opacity-60 mt-2">
                        Uploads: {uploads.join(', ')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="text-xs font-semibold px-3 py-2 rounded-full border border-black/10 dark:border-white/10 disabled:opacity-40 flex items-center gap-2"
                    disabled={!ws.downloadUrl}
                    onClick={() => {
                      if (!ws.downloadUrl) return;
                      window.open(ws.downloadUrl, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <Download size={14} />
                    {labels.download}
                  </button>

                  <label className="text-xs font-semibold px-3 py-2 rounded-full bg-[#d4a373] text-black hover:bg-[#c9935f] transition-colors cursor-pointer flex items-center gap-2">
                    <Upload size={14} />
                    {labels.upload}
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        addWorksheetUpload(worksheetsKey, ws.id, f.name);
                        e.currentTarget.value = '';
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-black/5 dark:border-white/10 p-4">
          <div className="text-sm font-semibold mb-2">{labels.onlineEdit}</div>
          <textarea
            value={state.onlineText ?? ''}
            onChange={(e) => setWorksheetOnlineText(worksheetsKey, e.target.value)}
            className="w-full min-h-[140px] rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm focus:outline-none focus:border-[#d4a373]/60"
            placeholder={labels.placeholder}
          />
        </div>

        <div className="rounded-xl border border-black/5 dark:border-white/10 p-4">
          <div className="text-sm font-semibold mb-2">{labels.teacherFeedback}</div>
          <textarea
            value={state.teacherFeedback ?? ''}
            onChange={(e) => setTeacherFeedback(worksheetsKey, e.target.value)}
            className="w-full min-h-[140px] rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm focus:outline-none focus:border-[#d4a373]/60"
            placeholder={labels.placeholder}
          />
        </div>
      </div>
    </div>
  );
}

