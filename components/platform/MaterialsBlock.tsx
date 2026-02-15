'use client';

import React from 'react';
import type { CourseMaterial } from '@/lib/courses/types';
import type { LanguageCode } from '@/lib/curriculum/types';
import { getLocalized } from '@/lib/curriculum';
import { Download, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function MaterialsBlock({
  title,
  materials,
  language,
  labels,
}: {
  title: string;
  materials: CourseMaterial[];
  language: LanguageCode;
  labels: { download: string };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package size={18} className="text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {materials.map((m) => (
          <div key={m.id} className="rounded-lg border p-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold">{getLocalized(language, m.title)}</div>
              {m.description ? <div className="text-xs text-muted-foreground mt-1">{getLocalized(language, m.description)}</div> : null}
            </div>
            <Button
              type="button"
              disabled={!m.downloadUrl}
              onClick={() => {
                if (!m.downloadUrl) return;
                window.open(m.downloadUrl, '_blank', 'noopener,noreferrer');
              }}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 shrink-0"
            >
              <Download size={14} />
              {labels.download}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

