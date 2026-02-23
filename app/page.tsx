'use client';

import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { SubjectGrid } from '@/components/ui/SubjectGrid';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 md:p-24 overflow-hidden relative bg-background">

      <Navbar />

      <div className="w-full max-w-7xl z-10 pt-20 relative">
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-7xl font-serif font-bold tracking-tight text-foreground">Ridona</h1>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          <p className="text-xl text-muted-foreground font-handwriting italic">Explore, Learn, Create</p>
        </header>
        <SubjectGrid />
      </div>
    </main>
  );
}
