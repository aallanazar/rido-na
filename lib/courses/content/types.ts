import type { LocalizedString } from '@/lib/curriculum/types';

export type ModuleContent = {
    theory: LocalizedString;
    practice: LocalizedString;
    demo: LocalizedString;
    video: LocalizedString;
    steps: LocalizedString;
    interactive: LocalizedString;
    homeworks: { title: LocalizedString; description: LocalizedString }[];
    materials: { title: LocalizedString; description: LocalizedString }[];
};
