'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Calculator, Atom, Beaker, Microscope, Code, FileSpreadsheet,
    BookOpen, PenTool, Brain, CircleHelp, Folder
} from 'lucide-react';

const GRID_ITEMS = [
    { id: 'math', label: 'Matematika', icon: Calculator },
    { id: 'physics', label: 'Fizika', icon: Atom },
    { id: 'chemistry', label: 'Kimyo', icon: Beaker },
    { id: 'biology', label: 'Biologiya', icon: Microscope },
    { id: 'coding', label: 'Dasturlash', icon: Code },
    { id: 'office', label: 'Microsoft Office', icon: FileSpreadsheet },
    // Module types / Extra subjects
    { id: 'theory', label: 'Nazariya', icon: BookOpen },
    { id: 'examples', label: 'Misollar', icon: PenTool },
    { id: 'practice', label: 'Amaliyot', icon: Brain },
    { id: 'quiz', label: 'Quiz', icon: CircleHelp },
    { id: 'materials', label: 'Materiallar', icon: Folder },
];

export function SubjectGrid() {
    const router = useRouter();

    const handleSelect = (id: string) => {
        router.push(`/platform/${id}`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 mt-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {GRID_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                        className="flex flex-col items-center justify-center p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm
                       border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm
                       hover:scale-105 hover:shadow-md hover:border-amber-400/50 dark:hover:border-amber-400/50
                       transition-all duration-300 group"
                    >
                        <div className="mb-4 p-4 bg-amber-100/50 dark:bg-amber-900/20 rounded-full text-amber-700 dark:text-amber-500 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors">
                            <item.icon size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 font-sans">
                            {item.label}
                        </h3>
                    </button>
                ))}
            </div>
        </div>
    );
}
