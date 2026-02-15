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
                    className="fixed inset-0 z-100 flex items-center justify-center pointer-events-none"
                >
                    {/* Paper Flash with gradient */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        className="absolute inset-0 bg-linear-to-b from-(--color-paper-light) to-(--color-neutral-50) dark:from-(--color-paper-dark) dark:to-neutral-900 origin-top h-full"
                        transition={{ duration: 0.5, ease: "circInOut" }}
                    />

                    {/* Pencil & Line with color scheme */}
                    <div className="relative flex items-center justify-center">
                        <motion.div
                            animate={{
                                x: [-100, 100, -50, 50, 0],
                                y: [-10, 10, -5, 5, 0],
                                rotate: [20, 40, 20, 40, 30]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="text-(--color-primary)"
                        >
                            <Pencil size={48} strokeWidth={1.5} />
                        </motion.div>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 200 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 h-1 bg-linear-to-r from-transparent via-(--color-primary) to-transparent origin-left shadow-lg"
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
