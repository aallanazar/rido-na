'use client';

import React from 'react';
import type { CourseHomework } from '@/lib/courses/types';
import type { LanguageCode } from '@/lib/curriculum/types';
import { getLocalized } from '@/lib/curriculum';
import { usePlatformStore } from '@/lib/store/usePlatformStore';
import { Upload, ClipboardList } from 'lucide-react';

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
    upload: string;
    codeInput: string;
    placeholder: string;
    rating: string;
    feedback: string;
  };
}) {
  const { worksheets: store, setWorksheetOnlineText, addWorksheetUpload, setTeacherFeedback } = usePlatformStore();
  const state = store[homeworksKey] ?? { uploads: {} };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
      <h3 className="text-xl font-serif font-bold mb-4">{labels.title}</h3>

      <div className="space-y-4">
        {homeworks.map((hw) => {
          const uploads = state.uploads?.[hw.id] ?? [];
          return (
            <div key={hw.id} className="rounded-xl border border-black/5 dark:border-white/10 p-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d4a373]/10 flex items-center justify-center text-[#d4a373]">
                    <ClipboardList size={18} />
                  </div>
                  <div>
                    <div className="font-semibold">{getLocalized(language, hw.title)}</div>
                    <div className="text-xs opacity-70 mt-1">{getLocalized(language, hw.description)}</div>
                    {uploads.length ? <div className="text-xs opacity-60 mt-2">Uploads: {uploads.join(', ')}</div> : null}
                  </div>
                </div>

                <label className="text-xs font-semibold px-3 py-2 rounded-full bg-[#d4a373] text-black hover:bg-[#c9935f] transition-colors cursor-pointer flex items-center gap-2 w-fit">
                  <Upload size={14} />
                  {labels.upload}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      addWorksheetUpload(homeworksKey, hw.id, f.name);
                      e.currentTarget.value = '';
                    }}
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-black/5 dark:border-white/10 p-4">
          <div className="text-sm font-semibold mb-2">{labels.codeInput}</div>
          <textarea
            value={state.onlineText ?? ''}
            onChange={(e) => setWorksheetOnlineText(homeworksKey, e.target.value)}
            className="w-full min-h-[160px] rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#d4a373]/60"
            placeholder={labels.placeholder}
          />
        </div>
        <div className="rounded-xl border border-black/5 dark:border-white/10 p-4">
          <div className="text-sm font-semibold mb-2">{labels.feedback}</div>
          <textarea
            value={state.teacherFeedback ?? ''}
            onChange={(e) => setTeacherFeedback(homeworksKey, e.target.value)}
            className="w-full min-h-[160px] rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm focus:outline-none focus:border-[#d4a373]/60"
            placeholder={labels.placeholder}
          />
          <div className="mt-3 text-xs opacity-60">{labels.rating}</div>
        </div>
      </div>
    </div>
  );
}

