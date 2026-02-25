'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { SubjectGrid } from '@/components/ui/SubjectGrid';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useTranslation } from '@/lib/hooks/useTranslation';
import {
  BookOpen, GraduationCap, Code, Trophy, ArrowRight,
  Sparkles, Users, Star, Zap,
} from 'lucide-react';

export default function Home() {
  const { user } = useAuthStore();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background overflow-hidden relative">
      <Navbar />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-28 pb-20 px-4 md:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4a373]/10 via-transparent to-[#c9935f]/5 dark:from-[#d4a373]/5 dark:to-transparent" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#d4a373]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#c9935f]/6 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4a373]/10 border border-[#d4a373]/20 text-sm font-medium text-[#c9935f] dark:text-[#d4a373]">
              <Sparkles size={14} />
              <span>Interaktive Lernplattform</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight text-foreground">
              Ridona
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Entdecke Wissen auf eine neue Art. Lerne Programmierung, Mathematik,
              Naturwissenschaften und mehr — interaktiv, strukturiert und kostenlos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {user ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#d4a373] to-[#c9935f] text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <GraduationCap size={22} />
                  Zum Dashboard
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#d4a373] to-[#c9935f] text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Zap size={20} />
                    Kostenlos starten
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-[#d4a373]/30 text-foreground font-semibold text-lg hover:bg-[#d4a373]/5 transition-all"
                  >
                    Anmelden
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {[
              { icon: BookOpen, value: '14+', label: 'Kurse' },
              { icon: Code, value: '200+', label: 'Lektionen' },
              { icon: Trophy, value: '100+', label: 'Quizze' },
              { icon: Users, value: '3', label: 'Sprachen' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/10"
              >
                <stat.icon size={24} className="text-[#d4a373] mb-2" />
                <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-transparent to-[#fdfbf7]/50 dark:to-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">Warum Ridona?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Von Grundlagen bis Expertenwissen — alles was du brauchst, um effektiv zu lernen.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: 'Strukturierte Kurse',
                desc: 'Jeder Kurs ist in Module und Lektionen unterteilt. Theorie, Praxis, Demos und interaktive Aufgaben — alles aufeinander aufgebaut.',
              },
              {
                icon: Code,
                title: 'Integrierter Code-Editor',
                desc: 'Schreibe und teste Code direkt im Browser. Mit Live-Vorschau für HTML/CSS/JS und Syntax-Highlighting für alle Sprachen.',
              },
              {
                icon: Trophy,
                title: 'Quizze & Fortschritt',
                desc: 'Teste dein Wissen nach jedem Modul. Verfolge deinen Fortschritt auf dem Dashboard und schalte neue Module frei.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4a373]/20 to-[#c9935f]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon size={26} className="text-[#d4a373]" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Course Grid ─── */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">Fächer & Kurse</h2>
          <p className="text-center text-muted-foreground mb-8">
            Wähle ein Fach und starte sofort mit dem Lernen.
          </p>
          <SubjectGrid />
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 px-4 border-t border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ridona — Interaktive Lernplattform. MIT Lizenz.
          </p>
        </div>
      </footer>
    </main>
  );
}
