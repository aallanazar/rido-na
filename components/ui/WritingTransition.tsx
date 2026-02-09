'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil } from 'lucide-react';

interface WritingTransitionProps {
    isVisible: boolean;
}

export function WritingTransition({ isVisible }: WritingTransitionProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
                >
                    {/* Paper Flash */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        className="absolute inset-0 bg-[#fdfbf7] dark:bg-[#1a1a1a] origin-top h-full"
                        transition={{ duration: 0.5, ease: "circInOut" }}
                    />

                    {/* Pencil & Line */}
                    <div className="relative flex items-center justify-center">
                        <motion.div
                            animate={{
                                x: [-100, 100, -50, 50, 0],
                                y: [-10, 10, -5, 5, 0],
                                rotate: [20, 40, 20, 40, 30]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="text-[#2c3e50] dark:text-[#e0e0e0]"
                        >
                            <Pencil size={48} strokeWidth={1} />
                        </motion.div>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 200 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 h-0.5 bg-black/20 dark:bg-white/20 origin-left"
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
