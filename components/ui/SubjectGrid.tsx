'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Calculator, Atom, Beaker, Microscope, Code, FileSpreadsheet,
    BookOpen, PenTool, Brain, CircleHelp, Folder, Monitor
} from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';

const GRID_ITEMS = [
    { id: 'math', label: 'Matematika', icon: Calculator },
    { id: 'physics', label: 'Fizika', icon: Atom },
    { id: 'chemistry', label: 'Kimyo', icon: Beaker },
    { id: 'biology', label: 'Biologiya', icon: Microscope },
    { id: 'coding', label: 'Dasturlash', icon: Code },
    { id: 'office', label: 'Microsoft Office', icon: FileSpreadsheet },
    { id: 'it', label: 'Informatik', icon: Monitor }, // Added IT
    // Module types / Extra subjects
    { id: 'theory', label: 'Nazariya', icon: BookOpen },
    { id: 'examples', label: 'Misollar', icon: PenTool },
    { id: 'practice', label: 'Amaliyot', icon: Brain },
    { id: 'quiz', label: 'Quiz', icon: CircleHelp },
    { id: 'materials', label: 'Materiallar', icon: Folder },
];

export function SubjectGrid() {
    const router = useRouter();
    const { t } = useTranslation(); // Note: useTranslation isn't imported yet, I'll fix imports below.

    const handleSelect = (id: string) => {
        router.push(`/platform/${id}`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 mt-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {GRID_ITEMS.map((item, index) => {
                    // Try subject translation first, then moduleType
                    const label = t(`subjects.${item.id}`) !== `subjects.${item.id}`
                        ? t(`subjects.${item.id}`)
                        : (t(`moduleTypes.${item.id}`) !== `moduleTypes.${item.id}` ? t(`moduleTypes.${item.id}`) : item.label);

                    // Color rotation based on index
                    const colors = [
                        { bg: 'from-[var(--color-primary)]/10 to-[var(--color-primary)]/5', icon: 'text-[var(--color-primary)]', hover: 'hover:from-[var(--color-primary)]/20 hover:to-[var(--color-primary)]/10' },
                        { bg: 'from-[var(--color-secondary)]/10 to-[var(--color-secondary)]/5', icon: 'text-[var(--color-secondary)]', hover: 'hover:from-[var(--color-secondary)]/20 hover:to-[var(--color-secondary)]/10' },
                        { bg: 'from-[var(--color-success)]/10 to-[var(--color-success)]/5', icon: 'text-[var(--color-success)]', hover: 'hover:from-[var(--color-success)]/20 hover:to-[var(--color-success)]/10' },
                        { bg: 'from-[var(--color-warning)]/10 to-[var(--color-warning)]/5', icon: 'text-[var(--color-warning)]', hover: 'hover:from-[var(--color-warning)]/20 hover:to-[var(--color-warning)]/10' },
                    ];
                    const colorSet = colors[index % colors.length];

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className={`flex flex-col items-center justify-center p-8 bg-gradient-to-br ${colorSet.bg} dark:${colorSet.bg.replace('10', '10').replace('5', '8')} backdrop-blur-sm
                       border border-[var(--color-primary)]/10 dark:border-white/10 rounded-2xl shadow-md
                       hover:scale-105 hover:shadow-lg hover:border-[var(--color-primary)]/30 dark:hover:border-white/20 ${colorSet.hover}
                       transition-all duration-300 group overflow-hidden relative`}
                        >
                            {/* Subtle background pattern */}
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                                backgroundImage: 'radial-gradient(circle at 50% 50%, white 0%, transparent 100%)'
                            }} />
                            
                            <div className="relative z-10 flex flex-col items-center">
                                <div className={`mb-4 p-4 bg-gradient-to-br ${colorSet.bg} dark:bg-gradient-to-br dark:${colorSet.bg.replace('10', '20').replace('5', '10')} rounded-full ${colorSet.icon} group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-semibold text-[var(--color-ink-light)] dark:text-[var(--color-ink-dark)] font-sans text-center">
                                    {label}
                                </h3>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
