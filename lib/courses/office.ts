import type { Course } from './types';
import { ls, makeHomeworks, makeMaterials, makeQuiz10 } from './helpers';

export function buildOfficeCourse(): Course {
  const title = ls('Microsoft Office', 'Microsoft Office', 'Microsoft Office');

  const topics = [
    ls('Word: asoslar', 'Word: Grundlagen', 'Word: basics'),
    ls('Word: formatlash', 'Word: Formatierung', 'Word: formatting'),
    ls('Word: shablonlar', 'Word: Vorlagen', 'Word: templates'),
    ls('Excel: asoslar', 'Excel: Grundlagen', 'Excel: basics'),
    ls('Excel: formulalar', 'Excel: Formeln', 'Excel: formulas'),
    ls('Excel: diagrammalar', 'Excel: Diagramme', 'Excel: charts'),
    ls('Excel: pivot', 'Excel: Pivot', 'Excel: pivot'),
    ls('PowerPoint: asoslar', 'PowerPoint: Grundlagen', 'PowerPoint: basics'),
    ls('PowerPoint: dizayn', 'PowerPoint: Design', 'PowerPoint: design'),
    ls('PowerPoint: taqdimot', 'PowerPoint: Präsentation', 'PowerPoint: presenting'),
    ls('Outlook (ixtiyoriy)', 'Outlook (optional)', 'Outlook (optional)'),
    ls('Access (ixtiyoriy)', 'Access (optional)', 'Access (optional)'),
    ls('Office: hamkorlik', 'Office: Zusammenarbeit', 'Office: collaboration'),
    ls('Office: best practices', 'Office: Best Practices', 'Office: best practices'),
    ls('Final: amaliy topshiriq', 'Final: Praxisaufgabe', 'Final: practical assignment'),
  ];

  const modules = Array.from({ length: 15 }).map((_, i) => {
    const index = i + 1;
    const id = `m${index}`;
    const prefix = `office-${id}`;
    const topic = topics[i];

    return {
      index,
      id,
      title: ls(`Modul ${index}: ${topic.uz}`, `Modul ${index}: ${topic.de}`, `Module ${index}: ${topic.en}`),
      description: ls(
        `Bu modul: ${topic.uz}.`,
        `Dieses Modul: ${topic.de}.`,
        `This module: ${topic.en}.`
      ),
      sections: [
        {
          type: 'theory' as const, title: ls('Nazariya', 'Theorie-Erklärung', 'Theory'), content: ls(
            `Microsoft Office — ${topic.uz}: Bu bo'limda asosiy tushunchalar va funksiyalar batafsil tushuntiriladi. Har bir amal ekranda ko'rsatmalar bilan mustahkamlanadi. Maqsad — ishchi hayotda kerak bo'ladigan ko'nikmalarni o'rganish.`,
            `Microsoft Office — ${topic.de}: In diesem Abschnitt werden die grundlegenden Konzepte und Funktionen ausführlich erklärt. Jede Aktion wird mit Bildschirmanweisungen unterstützt. Ziel: praxisrelevante Fähigkeiten für den Arbeitsalltag erlernen.`,
            `Microsoft Office — ${topic.en}: This section explains the core concepts and features in detail. Each action is supported with on-screen instructions. Goal: learn work-relevant skills for everyday professional life.`
          )
        },
        {
          type: 'practice' as const, title: ls('Amaliyot', 'Praxis', 'Practice'), content: ls(
            `Amaliy mashqlar:\n1) ${topic.uz} bo'yicha oddiy topshiriq — boshlang'ich daraja.\n2) ${topic.uz} — o'rta daraja, real hujjat bilan ishlash.\n3) ${topic.uz} — murakkabroq vazifa.\nHar bir topshiriqni o'zingiz bajaring.`,
            `Praxisübungen:\n1) ${topic.de} — einfache Aufgabe, Einstiegsniveau.\n2) ${topic.de} — mittleres Niveau, Arbeit mit realen Dokumenten.\n3) ${topic.de} — komplexere Aufgabe.\nJede Aufgabe selbst durchführen.`,
            `Practice exercises:\n1) ${topic.en} — simple task, beginner level.\n2) ${topic.en} — intermediate level, working with real documents.\n3) ${topic.en} — more complex task.\nComplete each task yourself.`
          )
        },
        {
          type: 'demo' as const, title: ls('Demo', 'Demos', 'Demos'), content: ls(
            `Live demo: ${topic.uz} mavzusida hujjat yaratamiz va formatlashni ko'rsatamiz.`,
            `Live-Demo: Wir erstellen ein Dokument zum Thema ${topic.de} und zeigen die Formatierung.`,
            `Live demo: We create a document on ${topic.en} and demonstrate formatting.`
          )
        },
        {
          type: 'video' as const, title: ls('Video', 'Video', 'Video'), content: ls(
            `Video darslik: Microsoft Office — ${topic.uz}. Nazariya va amaliyot birlashtirilgan. Davomiyligi: 15-20 daqiqa.`,
            `Video-Lektion: Microsoft Office — ${topic.de}. Theorie und Praxis kombiniert. Dauer: 15–20 Minuten.`,
            `Video lesson: Microsoft Office — ${topic.en}. Theory and practice combined. Duration: 15–20 minutes.`
          )
        },
        {
          type: 'steps' as const, title: ls('Qadam-baqadam', 'Schritt-für-Schritt Übungen', 'Step-by-step exercises'), content: ls(
            `1) Dasturni oching va yangi hujjat yarating.\n2) ${topic.uz} bo'yicha asosiy amallarni bajaring.\n3) Natijani tekshiring va formatlang.\n4) Hujjatni saqlang va eksport qiling.\n5) Boshqa format bilan solishtiring.`,
            `1) Programm öffnen und neues Dokument erstellen.\n2) Grundlegende Aktionen zu ${topic.de} ausführen.\n3) Ergebnis prüfen und formatieren.\n4) Dokument speichern und exportieren.\n5) Mit anderem Format vergleichen.`,
            `1) Open the program and create a new document.\n2) Perform basic actions for ${topic.en}.\n3) Check the result and format it.\n4) Save and export the document.\n5) Compare with another format.`
          )
        },
        {
          type: 'interactive' as const, title: ls('Interaktiv vazifa', 'Interaktive Aufgaben', 'Interactive tasks'), content: ls(
            `Interaktiv mashq: ${topic.uz} bo'yicha berilgan hujjatni formatlang yoki xatolarni toping. Maqsad — mustaqil ishlash ko'nikmasini rivojlantirish.`,
            `Interaktive Übung: Formatieren Sie das gegebene Dokument zu ${topic.de} oder finden Sie die Fehler. Ziel: eigenständige Arbeitsfähigkeiten entwickeln.`,
            `Interactive exercise: Format the given document on ${topic.en} or find the errors. Goal: develop independent working skills.`
          )
        },
      ],
      quizTitle: ls('Quiz (10 savol)', 'Quiz (10 Fragen)', 'Quiz (10 questions)'),
      quiz: makeQuiz10({
        prefix,
        basePrompt: ls(
          `${topic.uz}: eng muhim amal qaysi?`,
          `${topic.de}: welche Aktion ist zentral?`,
          `${topic.en}: which action is central?`
        ),
        choices: [
          ls('Formatlash', 'Formatierung', 'Formatting'),
          ls('Saqlash', 'Speichern', 'Saving'),
          ls('Eksport', 'Export', 'Export'),
          ls('Hammasi', 'Alle', 'All'),
        ],
        correctIndex: 3,
        explanation: ls(
          "Bu bo'limda amaliyot + nazariya bor.",
          'In diesem Abschnitt gibt es Theorie und Praxis.',
          'This section combines theory and practice.'
        ),
      }),
      homeworks: [
        {
          id: `${prefix}-hw1`,
          title: ls(`Uy vazifasi 1: ${topic.uz}`, `Hausaufgabe 1: ${topic.de}`, `Homework 1: ${topic.en}`),
          description: ls(
            `${topic.uz} mavzusi bo'yicha hujjat yarating va formatlang.`,
            `Erstellen und formatieren Sie ein Dokument zum Thema ${topic.de}.`,
            `Create and format a document on ${topic.en}.`
          ),
        },
        {
          id: `${prefix}-hw2`,
          title: ls(`Uy vazifasi 2: ${topic.uz} mashqlar`, `Hausaufgabe 2: ${topic.de} Übungen`, `Homework 2: ${topic.en} exercises`),
          description: ls(
            `${topic.uz} bo'yicha 3 ta mashq bajaring va natijalarni saqlang.`,
            `Lösen Sie 3 Übungen zu ${topic.de} und speichern Sie die Ergebnisse.`,
            `Complete 3 exercises on ${topic.en} and save the results.`
          ),
        },
        ...(index % 4 === 0 ? [{
          id: `${prefix}-hw3`,
          title: ls(`Uy vazifasi 3: ${topic.uz} loyiha`, `Hausaufgabe 3: ${topic.de} Projekt`, `Homework 3: ${topic.en} project`),
          description: ls(
            `${topic.uz} mavzusida kichik loyiha bajaring.`,
            `Erstellen Sie ein kleines Projekt zum Thema ${topic.de}.`,
            `Create a small project on ${topic.en}.`
          ),
        }] : []),
      ],
      materials: [
        {
          id: `${prefix}-mat1`,
          title: ls(`${topic.uz} — Qo'llanma`, `${topic.de} — Leitfaden`, `${topic.en} — Guide`),
          description: ls(
            `Microsoft Office: ${topic.uz} bo'yicha to'liq qo'llanma.`,
            `Microsoft Office: Vollständiger Leitfaden zu ${topic.de}.`,
            `Microsoft Office: Complete guide for ${topic.en}.`
          ),
        },
        {
          id: `${prefix}-mat2`,
          title: ls(`${topic.uz} — Mashqlar`, `${topic.de} — Übungen`, `${topic.en} — Exercises`),
          description: ls(
            `${topic.uz} bo'yicha qo'shimcha mashqlar.`,
            `Ergänzende Übungen zu ${topic.de}.`,
            `Additional exercises for ${topic.en}.`
          ),
        },
      ],
    };
  });

  return {
    group: 'office',
    id: 'microsoft-office',
    title,
    description: ls(
      'Word, Excel va PowerPoint bo‘yicha amaliy kurs.',
      'Praxis-Kurs zu Word, Excel und PowerPoint.',
      'Practical course for Word, Excel, and PowerPoint.'
    ),
    features: ['code-editor'],
    modules,
    minScoreToUnlockNext: 7,
  };
}
