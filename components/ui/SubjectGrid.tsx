'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Calculator, Atom, Beaker, Microscope, Code, FileSpreadsheet,
    BookOpen, PenTool, Brain, CircleHelp, Folder, Monitor
} from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { Button } from '@/components/ui/button';

const GRID_ITEMS = [
    { id: 'math', label: 'Matematika', icon: Calculator },
    { id: 'physics', label: 'Fizika', icon: Atom },
    { id: 'chemistry', label: 'Kimyo', icon: Beaker },
    { id: 'biology', label: 'Biologiya', icon: Microscope },
    { id: 'coding', label: 'Dasturlash', icon: Code },
    { id: 'office', label: 'Microsoft Office', icon: FileSpreadsheet },
    { id: 'it', label: 'Informatik', icon: Monitor },
    { id: 'theory', label: 'Nazariya', icon: BookOpen },
    { id: 'examples', label: 'Misollar', icon: PenTool },
    { id: 'practice', label: 'Amaliyot', icon: Brain },
    { id: 'quiz', label: 'Quiz', icon: CircleHelp },
    { id: 'materials', label: 'Materiallar', icon: Folder },
];

export function SubjectGrid() {
    const router = useRouter();
    const { t } = useTranslation();

    const handleSelect = (id: string) => {
        router.push(`/platform/${id}`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 mt-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {GRID_ITEMS.map((item) => {
                    const label = t(`subjects.${item.id}`) !== `subjects.${item.id}`
                        ? t(`subjects.${item.id}`)
                        : (t(`moduleTypes.${item.id}`) !== `moduleTypes.${item.id}` ? t(`moduleTypes.${item.id}`) : item.label);

                    return (
                        <Button
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            variant="ghost"
                            className="flex flex-col items-center justify-center p-8 h-auto rounded-2xl bg-card border shadow-sm hover:shadow-md hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 group"
                        >
                            <div className="mb-4 p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                                <item.icon size={32} strokeWidth={1.5} className="text-primary" />
                            </div>
                            <h3 className="text-lg font-serif font-semibold text-foreground text-center">
                                {label}
                            </h3>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
