'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft, Zap, Download } from 'lucide-react';
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

const projectDetails: Record<
  string,
  {
    title: string;
    description: string;
    difficulty: string;
    duration: string;
    overview: string;
    objectives: string[];
    requirements: string[];
  }
> = {
  beginner: {
    title: 'To-Do List Anwendung',
    description: 'Master DOM manipulation and local storage',
    difficulty: 'Anfänger',
    duration: '1-2 Wochen',
    overview:
      'Erstelle eine vollständige To-Do-Anwendung mit HTML, CSS und Vanilla JavaScript. Diese Anwendung hilft dir, die Grundlagen der DOM-Manipulation und des lokalen Speichers zu verstehen.',
    objectives: [
      'DOM-Elemente mit JavaScript erstellen und manipulieren',
      'Event-Listener implementieren und auf Benutzerinteraktionen reagieren',
      'Daten mit localStorage speichern und abrufen',
      'CSS für ein ansprechendes Design verwenden',
      'Fehlerbehandlung und Datenverfügung implementieren',
    ],
    requirements: [
      'Benutzer können neue Aufgaben hinzufügen',
      'Aufgaben als erledigt/nicht erledigt markieren',
      'Aufgaben löschen können',
      'Aufgaben persistieren über Neuladen (localStorage)',
      'Responsive Design für Mobilgeräte',
    ],
  },
  intermediate: {
    title: 'Weather App',
    description: 'Fetch real-time data from an API',
    difficulty: 'Mittelstufe',
    duration: '2-3 Wochen',
    overview:
      'Entwickle eine Wetter-Anwendung, die echte Zeit-Daten von einer API abruft. Lerne asynchrone JavaScript-Operationen und API-Integration kennen.',
    objectives: [
      'Asynchrone JavaScript (async/await) verstehen und verwenden',
      'Mit externen APIs arbeiten und Daten abrufen',
      'JSON-Daten verarbeiten und anzeigen',
      'Error-Handling und Loading-States implementieren',
      'Daten visualisieren und in einer benutzerfreundlichen Oberfläche anzeigen',
    ],
    requirements: [
      'Wetter für die aktuelle Stadt abrufen',
      'Benutzer können Stadt suchen und ändern',
      'Aktuelle und zukünftige Vorhersagen anzeigen',
      'Wetterdaten mit Icons und Animationen darstellen',
      'Offline-Fallback oder Loading-Indikatoren',
    ],
  },
  advanced: {
    title: 'E-Commerce Shop',
    description: 'Full-stack logic simulation',
    difficulty: 'Schwierig',
    duration: '3-4 Wochen',
    overview:
      'Baue einen funktionierenden E-Commerce-Shop mit komplexem State-Management, Warenkorb-Logik und Checkout-Simulation. Dies ist das ultimative Projekt für fortgeschrittene Entwickler.',
    objectives: [
      'State-Management-Patterns implementieren',
      'Komplexe Komponenten-Hierarchien aufbauen',
      'Warenkorb-Logik und Bestellverwaltung umsetzen',
      'Zahlungs-Simulation und Bestätigungen implementieren',
      'Responsive und intuitive Benutzeroberfläche designen',
    ],
    requirements: [
      'Produktkatalog mit mindestens 10 Produkten',
      'Add-to-Cart und Warenkorb-Verwaltung',
      'Preisberechnungen und Versandkosten',
      'Checkout-Prozess mit Adress- und Zahlungsdaten',
      'Bestellbestätigung und Order-History',
      'Admin-Bereich zum Verwalten von Produkten',
    ],
  },
};

export default function FinalProjectDetailPage() {
  const params = useParams();
  const courseParam = params.course as string;
  const projectParam = params.project as string;
  const router = useRouter();
  const { t } = useTranslation();

  const courseId = isCodingCourseId(courseParam) ? (courseParam as CodingCourseId) : null;
  const project = projectDetails[projectParam] || null;

  if (!courseId || !project) {
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

      <div className="flex-grow p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{t('ui.back')}</span>
          </button>

          {/* Title Section */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Zap size={14} />
              {project.difficulty}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{project.description}</p>
            <div className="flex items-center gap-4 mt-6 text-sm">
              <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                ⏱️ {project.duration}
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                📚 { project.difficulty}
              </span>
            </div>
          </div>

          {/* Overview */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-border-light dark:border-border-dark">
              <h2 className="text-2xl font-bold mb-4">Überblick</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.overview}</p>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Learning Objectives */}
            <section>
              <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-border-light dark:border-border-dark h-full">
                <h2 className="text-xl font-bold mb-4">Lernziele</h2>
                <ul className="space-y-3">
                  {project.objectives.map((objective, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Requirements */}
            <section>
              <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-border-light dark:border-border-dark h-full">
                <h2 className="text-xl font-bold mb-4">Anforderungen</h2>
                <ul className="space-y-3">
                  {project.requirements.map((requirement, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                        ◆
                      </span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-primary/10 to-indigo-500/10 rounded-xl p-8 border border-primary/20 text-center">
            <h2 className="text-2xl font-bold mb-4">Bereit zu starten?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Erstelle ein Repository oder nutze unseren Online-Editor, um mit diesem Projekt zu beginnen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                Im Browser starten
              </button>
              <button className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                <Download size={18} />
                Starter-Template laden
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
