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
        { type: 'theory' as const, title: ls('Nazariya', 'Theorie-Erklärung', 'Theory'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
        { type: 'practice' as const, title: ls('Amaliyot', 'Praxis', 'Practice'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
        { type: 'demo' as const, title: ls('Demo', 'Demos', 'Demos'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
        { type: 'video' as const, title: ls('Video', 'Video', 'Video'), content: ls('Video joyi (keyin qo‘shiladi).', 'Video-Platzhalter (wird später ergänzt).', 'Video placeholder (added later).') },
        { type: 'steps' as const, title: ls('Qadam-baqadam', 'Schritt-für-Schritt Übungen', 'Step-by-step exercises'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
        { type: 'interactive' as const, title: ls('Interaktiv vazifa', 'Interaktive Aufgaben', 'Interactive tasks'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
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
          'Bu bo‘limda amaliyot + nazariya bor.',
          'In diesem Abschnitt gibt es Theorie und Praxis.',
          'This section combines theory and practice.'
        ),
      }),
      homeworks: makeHomeworks({ prefix, count: index % 4 === 0 ? 3 : 2 }),
      materials: makeMaterials({ prefix, count: 2 }),
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
