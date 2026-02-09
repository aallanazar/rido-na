'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { BookMenu } from '@/components/ui/Book/BookMenu';
import { WritingTransition } from '@/components/ui/WritingTransition';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleSubjectSelect = (path: string) => {
    setIsTransitioning(true);
    // Simulate loading/writing time
    setTimeout(() => {
      router.push(`/platform/${path}`);
    }, 1500);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-24 overflow-hidden">
      <Navbar />

      <div className="w-full max-w-6xl z-10">
        <BookMenu onSelect={handleSubjectSelect} />
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-12 left-12 w-32 h-32 opacity-10 dark:opacity-5 pointer-events-none">
        <div className="w-full h-full border-4 border-black dark:border-white rounded-full flex items-center justify-center">
          <div className="w-1/2 h-0.5 bg-black dark:bg-white rotate-45" />
        </div>
      </div>

      <WritingTransition isVisible={isTransitioning} />
    </main>
  );
}
