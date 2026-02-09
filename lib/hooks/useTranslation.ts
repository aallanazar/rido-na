'use client';

import { usePlatformStore } from '@/lib/store/usePlatformStore';
import { translations } from '@/lib/i18n/dict';

export function useTranslation() {
    const { language } = usePlatformStore();

    const t = (path: string, params?: Record<string, string>) => {
        const keys = path.split('.');
        const dict =
            translations[language as keyof typeof translations] ?? translations.en;
        let current: unknown = dict;

        for (const key of keys) {
            if (typeof current !== 'object' || current === null) return path;
            const record = current as Record<string, unknown>;
            if (!(key in record)) {
                return path;
            }
            current = record[key];
        }

        if (typeof current !== 'string') return path;
        if (!params) return current;

        return current.replace(/\{\{(\w+)\}\}/g, (_, key: string) => params[key] ?? `{{${key}}}`);
    };

    return { t, language };
}
