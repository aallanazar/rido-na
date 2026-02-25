import type { LocalizedString, QuizQuestion } from '@/lib/curriculum/types';
import type { CourseHomework, CourseMaterial } from './types';

export const ls = (uz: string, de: string, en: string): LocalizedString => ({ uz, de, en });

/**
 * Generate 10 topic-aware quiz questions.
 * Questions are generated from the topic name to avoid placeholder content.
 */
export function makeQuiz10(params: {
  prefix: string;
  basePrompt: LocalizedString;
  choices: LocalizedString[];
  correctIndex: number;
  explanation?: LocalizedString;
  topic?: { uz: string; de: string; en: string };
}): QuizQuestion[] {
  const t = params.topic ?? { uz: 'Mavzu', de: 'Thema', en: 'Topic' };

  const templates: Array<{
    prompt: (t: { uz: string; de: string; en: string }) => LocalizedString;
    choices: LocalizedString[];
    correctIndex: number;
    explanation: LocalizedString;
  }> = [
      {
        prompt: () => params.basePrompt,
        choices: params.choices,
        correctIndex: params.correctIndex,
        explanation: params.explanation ?? ls('To\'g\'ri javob tanlandi.', 'Die richtige Antwort wurde gewählt.', 'The correct answer was chosen.'),
      },
      {
        prompt: (t) => ls(
          `${t.uz} ning asosiy maqsadi nima?`,
          `Was ist das Hauptziel von ${t.de}?`,
          `What is the main purpose of ${t.en}?`
        ),
        choices: [
          ls("Tushunchalarni o'rganish", 'Konzepte erlernen', 'Learn concepts'),
          ls('Amaliy ko\'nikmalar', 'Praktische Fähigkeiten', 'Practical skills'),
          ls('Muammolarni hal qilish', 'Problemlösung', 'Problem solving'),
          ls('Hammasini birlashtirish', 'Alles kombinieren', 'Combine everything'),
        ],
        correctIndex: 3,
        explanation: ls('Bu mavzu nazariya va amaliyotni birlashtiradi.', 'Dieses Thema kombiniert Theorie und Praxis.', 'This topic combines theory and practice.'),
      },
      {
        prompt: (t) => ls(
          `${t.uz} da eng muhim qadam qaysi?`,
          `Welcher ist der wichtigste Schritt bei ${t.de}?`,
          `What is the most important step in ${t.en}?`
        ),
        choices: [
          ls('Rejalashtirish', 'Planung', 'Planning'),
          ls("Kod yozish", 'Code schreiben', 'Writing code'),
          ls('Testlash', 'Testen', 'Testing'),
          ls('Barcha qadamlar teng muhim', 'Alle Schritte gleich wichtig', 'All steps equally important'),
        ],
        correctIndex: 3,
        explanation: ls('Har bir qadam muhim — biri ham tashlab ketilmaydi.', 'Jeder Schritt ist wichtig — keiner darf übersprungen werden.', 'Every step matters — none should be skipped.'),
      },
      {
        prompt: (t) => ls(
          `${t.uz} ni o'rganishning eng samarali usuli qaysi?`,
          `Was ist die effektivste Methode, ${t.de} zu lernen?`,
          `What is the most effective way to learn ${t.en}?`
        ),
        choices: [
          ls('Faqat nazariya o\'qish', 'Nur Theorie lesen', 'Only read theory'),
          ls('Faqat video ko\'rish', 'Nur Videos schauen', 'Only watch videos'),
          ls('Amaliyot + nazariya', 'Praxis + Theorie', 'Practice + theory'),
          ls('Yod olish', 'Auswendig lernen', 'Memorization'),
        ],
        correctIndex: 2,
        explanation: ls('Nazariya va amaliyotning uyg\'unligi eng samarali.', 'Die Kombination aus Theorie und Praxis ist am effektivsten.', 'Combining theory and practice is most effective.'),
      },
      {
        prompt: (t) => ls(
          `${t.uz} da xato qilsangiz nima qilasiz?`,
          `Was tun Sie bei einem Fehler in ${t.de}?`,
          `What do you do when you make an error in ${t.en}?`
        ),
        choices: [
          ls('Dasturni o\'chirish', 'Programm schließen', 'Close the program'),
          ls('Xatoni tahlil qilish', 'Fehler analysieren', 'Analyze the error'),
          ls('Boshqatdan boshlash', 'Neu anfangen', 'Start over'),
          ls('E\'tibor bermaslik', 'Ignorieren', 'Ignore it'),
        ],
        correctIndex: 1,
        explanation: ls('Xatolarni tahlil qilish — eng muhim ko\'nikma.', 'Fehleranalyse ist die wichtigste Fähigkeit.', 'Error analysis is the most important skill.'),
      },
      {
        prompt: (t) => ls(
          `${t.uz} qaysi kategoriyaga kiradi?`,
          `Zu welcher Kategorie gehört ${t.de}?`,
          `Which category does ${t.en} belong to?`
        ),
        choices: [
          ls('Asosiy tushunchalar', 'Grundlegende Konzepte', 'Fundamental concepts'),
          ls('Ilg\'or mavzular', 'Fortgeschrittene Themen', 'Advanced topics'),
          ls('Amaliy ko\'nikmalar', 'Praktische Fähigkeiten', 'Practical skills'),
          ls('Mavzuga bog\'liq', 'Themenabhängig', 'Depends on the topic'),
        ],
        correctIndex: 3,
        explanation: ls('Kategoriya mavzuning murakkabligiga bog\'liq.', 'Die Kategorie hängt von der Komplexität des Themas ab.', 'The category depends on the topic\'s complexity.'),
      },
      {
        prompt: (t) => ls(
          `${t.uz} uchun qanday muhit kerak?`,
          `Welche Umgebung wird für ${t.de} benötigt?`,
          `What environment is needed for ${t.en}?`
        ),
        choices: [
          ls('Matn muharriri', 'Texteditor', 'Text editor'),
          ls('IDE (ishlab chiqish muhiti)', 'IDE (Entwicklungsumgebung)', 'IDE (development environment)'),
          ls('Brauzer', 'Browser', 'Browser'),
          ls('Mavzuga bog\'liq', 'Themenabhängig', 'Depends on the topic'),
        ],
        correctIndex: 3,
        explanation: ls('Kerakli muhit mavzuga qarab farq qiladi.', 'Die benötigte Umgebung variiert je nach Thema.', 'The required environment varies by topic.'),
      },
      {
        prompt: (t) => ls(
          `${t.uz} ni qachon ishlatish kerak?`,
          `Wann sollte man ${t.de} einsetzen?`,
          `When should you use ${t.en}?`
        ),
        choices: [
          ls('Faqat katta loyihalarda', 'Nur bei großen Projekten', 'Only in large projects'),
          ls('Faqat kichik loyihalarda', 'Nur bei kleinen Projekten', 'Only in small projects'),
          ls('Har doim', 'Immer', 'Always'),
          ls('Kerak bo\'lganda', 'Bei Bedarf', 'When needed'),
        ],
        correctIndex: 3,
        explanation: ls('Har bir tool va texnika o\'z vaqtida ishlatiladi.', 'Jedes Tool wird situationsgerecht eingesetzt.', 'Each tool is used when the situation calls for it.'),
      },
      {
        prompt: (t) => ls(
          `${t.uz} bo'yicha bilimni qanday tekshirish mumkin?`,
          `Wie kann man das Wissen über ${t.de} überprüfen?`,
          `How can you verify your knowledge of ${t.en}?`
        ),
        choices: [
          ls('Test yozish', 'Tests schreiben', 'Write tests'),
          ls('Boshqalarga tushuntirish', 'Anderen erklären', 'Explain to others'),
          ls('Loyiha qurish', 'Projekt bauen', 'Build a project'),
          ls('Barchasi to\'g\'ri', 'Alle richtig', 'All of the above'),
        ],
        correctIndex: 3,
        explanation: ls('Bilimni testlar, tushuntirish va amaliyot orqali tekshirish mumkin.', 'Wissen kann durch Tests, Erklärungen und Praxis überprüft werden.', 'Knowledge can be verified through tests, explanations, and practice.'),
      },
      {
        prompt: (t) => ls(
          `${t.uz} ni o'zlashtirish uchun qancha vaqt kerak?`,
          `Wie viel Zeit braucht man, um ${t.de} zu beherrschen?`,
          `How much time is needed to master ${t.en}?`
        ),
        choices: [
          ls('Bir kun', 'Einen Tag', 'One day'),
          ls('Bir hafta', 'Eine Woche', 'One week'),
          ls('Bir oy', 'Einen Monat', 'One month'),
          ls('Doimiy mashq kerak', 'Ständige Übung nötig', 'Continuous practice needed'),
        ],
        correctIndex: 3,
        explanation: ls('Har qanday ko\'nikma doimiy mashq bilan mustahkamlanadi.', 'Jede Fähigkeit wird durch ständige Übung gefestigt.', 'Any skill is strengthened through continuous practice.'),
      },
    ];

  return templates.map((tmpl, i) => ({
    id: `${params.prefix}-q${i + 1}`,
    type: 'mcq' as const,
    prompt: tmpl.prompt(t),
    choices: tmpl.choices,
    correctIndex: tmpl.correctIndex,
    explanation: tmpl.explanation,
  }));
}

export function makeHomeworks(params: { prefix: string; count: 2 | 3 }): CourseHomework[] {
  const list: CourseHomework[] = [];
  for (let i = 1; i <= params.count; i += 1) {
    list.push({
      id: `${params.prefix}-hw${i}`,
      title: ls(`Uy vazifasi ${i}`, `Hausaufgabe ${i}`, `Homework ${i}`),
      description: ls('Wird ergänzt…', 'Wird ergänzt…', 'To be added…'),
    });
  }
  return list;
}

export function makeMaterials(params: { prefix: string; count: 2 | 3 }): CourseMaterial[] {
  const list: CourseMaterial[] = [];
  for (let i = 1; i <= params.count; i += 1) {
    list.push({
      id: `${params.prefix}-mat${i}`,
      title: ls(`Material ${i}`, `Material ${i}`, `Material ${i}`),
      description: ls('Download wird ergänzt…', 'Download wird ergänzt…', 'Download will be added…'),
    });
  }
  return list;
}
