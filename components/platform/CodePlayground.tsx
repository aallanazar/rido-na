'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <span className="text-xs font-semibold text-muted-foreground">
            {mode === 'web' ? 'HTML/CSS/JS' : 'Code'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className={mode === 'web' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : ''}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full min-h-65 rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            spellCheck={false}
          />

          {mode === 'web' ? (
            <iframe
              title="preview"
              className="w-full min-h-65 rounded-md border border-input bg-background"
              sandbox="allow-scripts allow-forms allow-modals"
              srcDoc={srcDoc}
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

