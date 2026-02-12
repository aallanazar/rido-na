'use client';

import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { SubjectGrid } from '@/components/ui/SubjectGrid';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 md:p-24 overflow-hidden relative bg-gradient-to-b from-[var(--color-paper-light)] to-[var(--color-neutral-50)] dark:from-[var(--color-paper-dark)] dark:to-[var(--color-neutral-900)]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none dark:opacity-[0.05]" style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/notebook.png")'
      }} />
      
      {/* Decorative gradient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />

      <Navbar />

      <div className="w-full max-w-7xl z-10 pt-20 relative">
        <SubjectGrid />
      </div>

    </main>
  );
}
