'use client';

import React, { useMemo, useState } from 'react';

export function CodePlayground({
  title,
  mode,
  initialCode,
}: {
  title: string;
  mode: 'code' | 'web';
  initialCode?: string;
}) {
  const [code, setCode] = useState(
    initialCode ??
      (mode === 'web'
        ? `<!doctype html>
<html>
  <head>
    <style>
      body { font-family: system-ui; padding: 16px; }
      .card { padding: 16px; border: 1px solid #ddd; border-radius: 12px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h3>Live Preview</h3>
      <button id="btn">Click</button>
      <p id="out">…</p>
    </div>
    <script>
      document.getElementById('btn').addEventListener('click', () => {
        document.getElementById('out').textContent = 'Hello from JS';
      });
    </script>
  </body>
</html>`
        : `// Code area (placeholder)\n`)
  );

  const srcDoc = useMemo(() => (mode === 'web' ? code : ''), [mode, code]);

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h3 className="text-xl font-serif font-bold">{title}</h3>
        <div className="text-xs font-semibold opacity-60">{mode === 'web' ? 'HTML/CSS/JS' : 'Code'}</div>
      </div>

      <div className={mode === 'web' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : ''}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full min-h-[260px] rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#d4a373]/60"
          spellCheck={false}
        />

        {mode === 'web' ? (
          <iframe
            title="preview"
            className="w-full min-h-[260px] rounded-xl border border-black/10 dark:border-white/10 bg-white"
            sandbox="allow-scripts allow-forms allow-modals"
            srcDoc={srcDoc}
          />
        ) : null}
      </div>
    </div>
  );
}

