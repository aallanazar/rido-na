'use client';

import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { SubjectGrid } from '@/components/ui/SubjectGrid';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 md:p-24 overflow-hidden relative bg-[#fdfbf7] dark:bg-[#0c0c0c]">
      <Navbar />

      <div className="w-full max-w-7xl z-10 pt-20">
        <SubjectGrid />
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-12 left-12 w-32 h-32 opacity-10 dark:opacity-5 pointer-events-none">
        <div className="w-full h-full border-4 border-black dark:border-white rounded-full flex items-center justify-center">
          <div className="w-1/2 h-0.5 bg-black dark:bg-white rotate-45" />
        </div>
      </div>
    </main>
  );
}
