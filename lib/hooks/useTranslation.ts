'use client';

import { usePlatformStore } from '@/lib/store/usePlatformStore';
import { translations } from '@/lib/i18n/dict';

export function useTranslation() {
    const { language } = usePlatformStore();

    const t = (path: string) => {
        const keys = path.split('.');
        let current: any = translations[language as keyof typeof translations] || translations.en;

        for (const key of keys) {
            if (current[key] === undefined) {
                return path; // Fallback to path name if key is missing
            }
            current = current[key];
        }

        return current;
    };

    return { t, language };
}
