'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft, Zap } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import type { CodingCourseId } from '@/lib/courses/types';

function isCodingCourseId(value: string): value is CodingCourseId {
  return (
    value === 'python' ||
    value === 'java' ||
    value === 'csharp' ||
    value === 'c' ||
    value === 'cpp' ||
    value === 'go' ||
    value === 'javascript' ||
    value === 'typescript' ||
    value === 'css' ||
    value === 'react' ||
    value === 'react-native' ||
    value === 'sql' ||
    value === 'nosql' ||
    value === 'linux'
  );
}

const projects = [
  {
    id: 'beginner',
    title: 'To-Do List',
    description: 'Master DOM manipulation and local storage. Perfect for solidifying your JavaScript fundamentals.',
    icon: '✓',
    difficulty: 'EASY',
    badge: 'Anfänger',
    technologies: ['HTML5', 'CSS3', 'Vanilla JS'],
    color: 'emerald',
  },
  {
    id: 'intermediate',
    title: 'Weather App',
    description: 'Fetch real-time data from an API and handle asynchronous JavaScript operations.',
    icon: 'cloud',
    difficulty: 'MEDIUM',
    badge: 'Recommended',
    technologies: ['Fetch API', 'Async/Await', 'JSON'],
    color: 'orange',
    recommended: true,
  },
  {
    id: 'advanced',
    title: 'E-Commerce Shop',
    description: 'Full-stack logic simulation. Manage state, simulate cart checkout, and build a complex UI.',
    icon: 'shopping_cart',
    difficulty: 'HARD',
    badge: 'BOSS LEVEL',
    technologies: ['React', 'State Mgmt', 'Payments'],
    color: 'red',
    boss: true,
  },
];

export default function FinalProjectPage() {
  const params = useParams();
  const courseParam = params.course as string;
  const router = useRouter();
  const { t } = useTranslation();

  const courseId = isCodingCourseId(courseParam) ? (courseParam as CodingCourseId) : null;

  if (!courseId) {
    return (
      <main className="min-h-screen p-8 pt-28 bg-[#fdfbf7] dark:bg-[#1a1a1a]">
        <Navbar />
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-8 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{t('ui.back')}</span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 mx-auto mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{t('ui.back')}</span>
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Final Assessment
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Wähle dein Projekt
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Beweise deine Fähigkeiten durch ein Projekt. Wähle einen Schwierigkeitsgrad, der deinen Zielen entspricht.
            </p>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-1 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col ${
                  project.boss ? 'transform scale-105 z-10 bg-gray-900 dark:bg-black border-red-900/50' : ''
                } ${project.boss ? 'hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]' : 'hover:shadow-lg'}`}
              >
                <div
                  className={`rounded-lg p-6 flex-grow flex flex-col items-center text-center relative overflow-hidden group ${
                    project.boss
                      ? 'bg-gradient-to-br from-red-900/40 to-black'
                      : project.color === 'emerald'
                        ? 'bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 dark:from-emerald-900/20 dark:to-cyan-900/20'
                        : 'bg-gradient-to-br from-orange-500/10 to-purple-500/10 dark:from-orange-900/20 dark:to-purple-900/20'
                  }`}
                >
                  {/* Circle Icon */}
                  <div
                    className={`h-24 w-24 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                      project.boss
                        ? 'bg-gradient-to-br from-red-600 to-rose-900 border border-red-400/30'
                        : project.color === 'emerald'
                          ? 'bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-emerald-500/20'
                          : 'bg-gradient-to-br from-orange-400 to-purple-500 shadow-orange-500/20'
                    }`}
                  >
                    {project.icon === 'cloud' && (
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                    {project.icon === 'shopping_cart' && (
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                    {project.icon === '✓' && (
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  {/* Badge */}
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${
                      project.boss
                        ? 'bg-red-900/80 text-red-200 border-red-500/50 shadow-[0_0_10px_rgba(220,38,38,0.5)]'
                        : project.color === 'emerald'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                          : 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 border-orange-200 dark:border-orange-800'
                    }`}
                  >
                    {project.difficulty}
                  </span>

                  {/* Recommended Tag */}
                  {project.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-20 tracking-wide uppercase">
                      Recommended
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      project.boss ? 'text-white drop-shadow-md tracking-wide' : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm mb-6 leading-relaxed ${
                      project.boss ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs rounded ${
                          project.boss
                            ? 'bg-black/50 text-red-300 border border-red-900/50'
                            : 'bg-background-light dark:bg-background-dark text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => router.push(`/platform/coding/${courseId}/final-project/${project.id}`)}
                    className={`mt-auto w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      project.boss
                        ? 'bg-red-700 hover:bg-red-600 text-white font-bold tracking-wide shadow-[0_0_20px_rgba(185,28,28,0.4)] border border-red-500/30'
                        : project.color === 'emerald'
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                          : 'bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-400 hover:to-purple-500 text-white shadow-lg shadow-purple-500/20'
                    }`}
                  >
                    {project.boss ? 'ENTER BOSS LEVEL' : 'Start Project'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Nicht sicher, welches Projekt du wählen sollst?{' '}
              <button
                onClick={() => router.back()}
                className="text-primary hover:text-primary/80 underline underline-offset-2"
              >
                Gehe zurück
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
