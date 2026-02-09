'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calculator, Atom, Ruler, Beaker, Languages,
    Code, Monitor, History, Microscope, Landmark, Star
} from 'lucide-react';
import { usePlatformStore } from '@/lib/store/usePlatformStore';
import { useTranslation } from '@/lib/hooks/useTranslation';

const subjects = [
    { id: 'math', icon: Calculator },
    { id: 'physics', icon: Atom },
    { id: 'geometry', icon: Ruler },
    { id: 'chemistry', icon: Beaker },
    {
        id: 'languages',
        icon: Languages,
        subItems: [
            { id: 'en', type: 'lang' },
            { id: 'ar', type: 'lang' },
            { id: 'de', type: 'lang' },
            { id: 'fr', type: 'lang' },
        ]
    },
    {
        id: 'coding',
        icon: Code,
        subItems: [
            { id: 'js', type: 'code' },
            { id: 'py', type: 'code' },
            { id: 'ts', type: 'code' },
        ]
    },
    { id: 'it', icon: Monitor },
    { id: 'history', icon: History },
    { id: 'biology', icon: Microscope },
    { id: 'economy', icon: Landmark },
    { id: 'astronomy', icon: Star },
];

export function BookMenu({ onSelect }: { onSelect?: (id: string) => void }) {
    const { t, language } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

    return (
        <div className="relative w-full max-w-5xl aspect-[4/3] mx-auto perspective-1000 flex items-center justify-center p-8">
            {/* Cover Side (Left) */}
            <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: isOpen ? -180 : 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute left-1/2 w-1/2 h-full z-20 origin-left preserve-3d cursor-pointer shadow-2xl rounded-r-lg overflow-hidden group"
                onClick={() => {
                    setIsOpen(!isOpen);
                    if (isOpen) setExpandedSubject(null);
                }}
            >
                {/* Front Cover */}
                <div className="absolute inset-0 backface-hidden bg-[#8b4513] dark:bg-[#3d2b1f] flex flex-col items-center justify-center p-12 border-4 border-[#5d2e0a] dark:border-[#2d1d13] text-white">
                    <div className="w-full h-full border-2 border-[#a67c52]/30 flex flex-col items-center justify-center rounded">
                        <h1 className="text-6xl font-serif font-bold mb-4 tracking-widest uppercase">RIDONA</h1>
                        <div className="w-24 h-1 bg-[#a67c52]/50 mb-8" />
                        <p className="text-xl font-handwriting italic opacity-80">Knowledge Opens Worlds</p>
                        <div className="mt-auto text-sm opacity-50 font-sans tracking-wide">CLICK TO OPEN</div>
                    </div>
                </div>

                {/* Inner Cover (Behind Front) */}
                <div className="absolute inset-0 bg-[#f4ece1] dark:bg-[#2a2a2a] rotate-y-180 backface-hidden flex items-center justify-center">
                    <div className="w-full h-full border-r border-[#000]/5 p-8 flex flex-col">
                        <h2 className="text-3xl font-serif italic mb-6">{t('ui.welcome')}</h2>
                        <p className="text-lg leading-relaxed font-sans opacity-70">
                            {t('ui.selectSubject')}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Static Base (Right Side / Content Under Pages) */}
            <div className="absolute right-1/2 translate-x-full w-1/2 h-full bg-[#fdfbf7] dark:bg-[#1f1f1f] shadow-2xl rounded-r-lg border-y-4 border-r-4 border-[#5d2e0a] dark:border-[#2d1d13] overflow-hidden">
                <div className="h-full p-8 flex flex-col overflow-y-auto no-scrollbar relative">
                    <AnimatePresence mode="wait">
                        {!expandedSubject ? (
                            <motion.div
                                key="main-menu"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                {subjects.map((subj) => (
                                    <motion.button
                                        key={subj.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (subj.subItems) {
                                                setExpandedSubject(subj.id);
                                            } else {
                                                onSelect?.(subj.id);
                                            }
                                        }}
                                        className="flex flex-col items-center justify-center p-4 rounded-xl border border-black/5 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <div className="w-12 h-12 flex items-center justify-center mb-3 text-[#d4a373] group-hover:text-[#a98467] transition-colors">
                                            <subj.icon size={32} strokeWidth={1.5} />
                                        </div>
                                        <span className="text-sm font-medium font-sans">
                                            {t(`subjects.${subj.id}`)}
                                        </span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sub-menu"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col h-full"
                            >
                                <button
                                    onClick={() => setExpandedSubject(null)}
                                    className="mb-6 text-sm font-serif italic flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
                                >
                                    {t('ui.backToMenu')}
                                </button>
                                <h3 className="text-2xl font-serif font-bold mb-6">
                                    {t(`subjects.${expandedSubject}`)}
                                </h3>
                                <div className="space-y-3">
                                    {subjects.find(s => s.id === expandedSubject)?.subItems?.map((sub) => (
                                        <button
                                            key={sub.id}
                                            onClick={() => {
                                                if (expandedSubject === 'languages') {
                                                    onSelect?.(`languages/${sub.id}`);
                                                } else {
                                                    onSelect?.(`${expandedSubject}/${sub.id}`);
                                                }
                                            }}
                                            className="w-full text-left p-4 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:bg-[#d4a373]/10 hover:border-[#d4a373]/30 transition-all font-sans"
                                        >
                                            {t(`subjects.${sub.id}`)}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Spine */}
            <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-[#5d2e0a] dark:bg-[#2a1a0a] z-30 shadow-inner rounded-sm" />
        </div>
    );
}
