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

    </main>
  );
}
