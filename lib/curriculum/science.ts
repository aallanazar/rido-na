import type { Curriculum, LocalizedString, SubjectId } from './types';

const ls = (uz: string, de: string, en: string): LocalizedString => ({ uz, de, en });

const scienceSubjectTitle: Record<SubjectId, LocalizedString> = {
  math: ls('Matematika', 'Mathematik', 'Mathematics'),
  physics: ls('Fizika', 'Physik', 'Physics'),
  chemistry: ls('Kimyo', 'Chemie', 'Chemistry'),
  biology: ls('Biologiya', 'Biologie', 'Biology'),
};

export const scienceCurriculum: Curriculum = {
  subjects: {
    math: {
      id: 'math',
      title: scienceSubjectTitle.math,
      levels: {
        school: {
          id: 'school',
          title: ls('📗 Maktab darajasi', '📗 Schulniveau', '📗 School level'),
          modules: [
            {
              id: 'algebra-basics',
              title: ls('Algebra asoslari', 'Algebra-Grundlagen', 'Algebra basics'),
              description: ls(
                "O'zgaruvchilar, tenglamalar va ifodalar bilan ishlash.",
                'Variablen, Gleichungen und Terme verstehen.',
                'Understand variables, equations, and expressions.'
              ),
              sections: [
                { type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'visuals', title: ls('Formulalar/Diagrammalar', 'Formeln/Diagramme', 'Formulas/Diagrams'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
              ],
              quizTitle: ls('Quiz: Algebra', 'Quiz: Algebra', 'Quiz: Algebra'),
              quiz: [
                {
                  id: 'q1',
                  type: 'mcq',
                  prompt: ls('x + 3 = 7. x nechiga teng?', 'x + 3 = 7. Wie groß ist x?', 'x + 3 = 7. What is x?'),
                  choices: [ls('3', '3', '3'), ls('4', '4', '4'), ls('5', '5', '5'), ls('7', '7', '7')],
                  correctIndex: 1,
                  solution: ls('7 - 3 = 4', '7 - 3 = 4', '7 - 3 = 4'),
                },
                {
                  id: 'q2',
                  type: 'open',
                  prompt: ls('2x = 10. x?', '2x = 10. x?', '2x = 10. x?'),
                  correctAnswer: { type: 'number', value: 5, tolerance: 0 },
                  solution: ls('10/2 = 5', '10/2 = 5', '10/2 = 5'),
                },
                ...Array.from({ length: 8 }).map((_, i) => ({
                  id: `q${i + 3}`,
                  type: 'mcq' as const,
                  prompt: ls('Platzhalter-Frage', 'Platzhalter-Frage', 'Placeholder question'),
                  choices: [ls('A', 'A', 'A'), ls('B', 'B', 'B'), ls('C', 'C', 'C'), ls('D', 'D', 'D')],
                  correctIndex: 0,
                  solution: ls('Wird ergänzt…', 'Wird ergänzt…', 'To be added…'),
                })),
              ],
              worksheets: [
                { id: 'ws1', title: ls('Arbeitsblatt 1', 'Aufgabenblatt 1', 'Worksheet 1'), description: ls('Wird ergänzt…', 'Wird ergänzt…', 'To be added…') },
                { id: 'ws2', title: ls('Arbeitsblatt 2', 'Aufgabenblatt 2', 'Worksheet 2'), description: ls('Wird ergänzt…', 'Wird ergänzt…', 'To be added…') },
              ],
            },
            {
              id: 'geometry-coordinates',
              title: ls('Koordinatensystem', 'Koordinatensystem', 'Coordinate plane'),
              description: ls(
                'Punkte, Abstände und einfache Geraden.',
                'Punkte, Abstände und einfache Geraden.',
                'Points, distances, and simple lines.'
              ),
              sections: [
                { type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
              ],
              quizTitle: ls('Quiz: Koordinaten', 'Quiz: Koordinaten', 'Quiz: Coordinates'),
              quiz: Array.from({ length: 10 }).map((_, i) => ({
                id: `q${i + 1}`,
                type: 'mcq' as const,
                prompt: ls('Platzhalter-Frage', 'Platzhalter-Frage', 'Placeholder question'),
                choices: [ls('A', 'A', 'A'), ls('B', 'B', 'B'), ls('C', 'C', 'C'), ls('D', 'D', 'D')],
                correctIndex: 0,
              })),
              worksheets: [
                { id: 'ws1', title: ls('Aufgabenblatt 1', 'Aufgabenblatt 1', 'Worksheet 1') },
                { id: 'ws2', title: ls('Aufgabenblatt 2', 'Aufgabenblatt 2', 'Worksheet 2') },
                { id: 'ws3', title: ls('Aufgabenblatt 3', 'Aufgabenblatt 3', 'Worksheet 3') },
              ],
            },
          ],
        },
        university: {
          id: 'university',
          title: ls('🎓 Universitet darajasi', '🎓 Universitätsniveau', '🎓 University level'),
          modules: [
            {
              id: 'analysis-limits',
              title: ls('Limitlar', 'Grenzwerte', 'Limits'),
              description: ls(
                'Limit tushunchasi va asosiy qoida.',
                'Begriff und Rechenregeln von Grenzwerten.',
                'Concept and rules of limits.'
              ),
              sections: [
                { type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'visuals', title: ls('Formulalar', 'Formeln', 'Formulas'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
              ],
              quizTitle: ls('Quiz: Grenzwerte', 'Quiz: Grenzwerte', 'Quiz: Limits'),
              quiz: Array.from({ length: 10 }).map((_, i) => ({
                id: `q${i + 1}`,
                type: 'mcq' as const,
                prompt: ls('Platzhalter-Frage', 'Platzhalter-Frage', 'Placeholder question'),
                choices: [ls('A', 'A', 'A'), ls('B', 'B', 'B'), ls('C', 'C', 'C'), ls('D', 'D', 'D')],
                correctIndex: 0,
              })),
              worksheets: [
                { id: 'ws1', title: ls('Aufgabenblatt 1', 'Aufgabenblatt 1', 'Worksheet 1') },
                { id: 'ws2', title: ls('Aufgabenblatt 2', 'Aufgabenblatt 2', 'Worksheet 2') },
              ],
            },
          ],
        },
      },
    },
    physics: {
      id: 'physics',
      title: scienceSubjectTitle.physics,
      levels: {
        school: {
          id: 'school',
          title: ls('📗 Maktab darajasi', '📗 Schulniveau', '📗 School level'),
          modules: [
            {
              id: 'mechanics-forces',
              title: ls('Kuchlar', 'Kräfte', 'Forces'),
              description: ls('Nyuton qonunlari asoslari.', 'Grundlagen der Newtonschen Gesetze.', "Newton's laws basics."),
              sections: [
                { type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
              ],
              quizTitle: ls('Quiz: Kuchlar', 'Quiz: Kräfte', 'Quiz: Forces'),
              quiz: Array.from({ length: 10 }).map((_, i) => ({
                id: `q${i + 1}`,
                type: 'mcq' as const,
                prompt: ls('Platzhalter-Frage', 'Platzhalter-Frage', 'Placeholder question'),
                choices: [ls('A', 'A', 'A'), ls('B', 'B', 'B'), ls('C', 'C', 'C'), ls('D', 'D', 'D')],
                correctIndex: 0,
              })),
              worksheets: [
                { id: 'ws1', title: ls('Aufgabenblatt 1', 'Aufgabenblatt 1', 'Worksheet 1') },
                { id: 'ws2', title: ls('Aufgabenblatt 2', 'Aufgabenblatt 2', 'Worksheet 2') },
              ],
            },
          ],
        },
        university: {
          id: 'university',
          title: ls('🎓 Universitet darajasi', '🎓 Universitätsniveau', '🎓 University level'),
          modules: [
            {
              id: 'classical-mechanics',
              title: ls('Klassik mexanika', 'Klassische Mechanik', 'Classical mechanics'),
              description: ls(
                'Harakat tenglamalari va energiya.',
                'Bewegungsgleichungen und Energie.',
                'Equations of motion and energy.'
              ),
              sections: [
                { type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'visuals', title: ls('Formulalar', 'Formeln', 'Formulas'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
              ],
              quizTitle: ls('Quiz: Mechanik', 'Quiz: Mechanik', 'Quiz: Mechanics'),
              quiz: Array.from({ length: 10 }).map((_, i) => ({
                id: `q${i + 1}`,
                type: 'mcq' as const,
                prompt: ls('Platzhalter-Frage', 'Platzhalter-Frage', 'Placeholder question'),
                choices: [ls('A', 'A', 'A'), ls('B', 'B', 'B'), ls('C', 'C', 'C'), ls('D', 'D', 'D')],
                correctIndex: 0,
              })),
              worksheets: [
                { id: 'ws1', title: ls('Aufgabenblatt 1', 'Aufgabenblatt 1', 'Worksheet 1') },
                { id: 'ws2', title: ls('Aufgabenblatt 2', 'Aufgabenblatt 2', 'Worksheet 2') },
                { id: 'ws3', title: ls('Aufgabenblatt 3', 'Aufgabenblatt 3', 'Worksheet 3') },
              ],
            },
          ],
        },
      },
    },
    chemistry: {
      id: 'chemistry',
      title: scienceSubjectTitle.chemistry,
      levels: {
        school: {
          id: 'school',
          title: ls('📗 Maktab darajasi', '📗 Schulniveau', '📗 School level'),
          modules: [
            {
              id: 'atoms-periodic',
              title: ls('Atomlar va periodik jadval', 'Atome & Periodensystem', 'Atoms & periodic table'),
              description: ls('Elementlar, atom tuzilishi.', 'Elemente und Atomaufbau.', 'Elements and atomic structure.'),
              sections: [
                { type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
              ],
              quizTitle: ls('Quiz: Atom', 'Quiz: Atom', 'Quiz: Atom'),
              quiz: Array.from({ length: 10 }).map((_, i) => ({
                id: `q${i + 1}`,
                type: 'mcq' as const,
                prompt: ls('Platzhalter-Frage', 'Platzhalter-Frage', 'Placeholder question'),
                choices: [ls('A', 'A', 'A'), ls('B', 'B', 'B'), ls('C', 'C', 'C'), ls('D', 'D', 'D')],
                correctIndex: 0,
              })),
              worksheets: [
                { id: 'ws1', title: ls('Aufgabenblatt 1', 'Aufgabenblatt 1', 'Worksheet 1') },
                { id: 'ws2', title: ls('Aufgabenblatt 2', 'Aufgabenblatt 2', 'Worksheet 2') },
              ],
            },
          ],
        },
        university: {
          id: 'university',
          title: ls('🎓 Universitet darajasi', '🎓 Universitätsniveau', '🎓 University level'),
          modules: [
            {
              id: 'thermodynamics',
              title: ls('Termodinamika', 'Thermodynamik', 'Thermodynamics'),
              description: ls('Energiya, entropiya, muvozanat.', 'Energie, Entropie, Gleichgewicht.', 'Energy, entropy, equilibrium.'),
              sections: [
                { type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'visuals', title: ls('Formulalar', 'Formeln', 'Formulas'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
              ],
              quizTitle: ls('Quiz: Thermo', 'Quiz: Thermodynamik', 'Quiz: Thermodynamics'),
              quiz: Array.from({ length: 10 }).map((_, i) => ({
                id: `q${i + 1}`,
                type: 'mcq' as const,
                prompt: ls('Platzhalter-Frage', 'Platzhalter-Frage', 'Placeholder question'),
                choices: [ls('A', 'A', 'A'), ls('B', 'B', 'B'), ls('C', 'C', 'C'), ls('D', 'D', 'D')],
                correctIndex: 0,
              })),
              worksheets: [
                { id: 'ws1', title: ls('Aufgabenblatt 1', 'Aufgabenblatt 1', 'Worksheet 1') },
                { id: 'ws2', title: ls('Aufgabenblatt 2', 'Aufgabenblatt 2', 'Worksheet 2') },
                { id: 'ws3', title: ls('Aufgabenblatt 3', 'Aufgabenblatt 3', 'Worksheet 3') },
              ],
            },
          ],
        },
      },
    },
    biology: {
      id: 'biology',
      title: scienceSubjectTitle.biology,
      levels: {
        school: {
          id: 'school',
          title: ls('📗 Maktab darajasi', '📗 Schulniveau', '📗 School level'),
          modules: [
            {
              id: 'cell-basics',
              title: ls('Hujayra asoslari', 'Zelle: Grundlagen', 'Cell basics'),
              description: ls("Hujayra tuzilishi va funksiyasi.", 'Aufbau und Funktion der Zelle.', 'Structure and function of cells.'),
              sections: [
                { type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
              ],
              quizTitle: ls('Quiz: Hujayra', 'Quiz: Zelle', 'Quiz: Cell'),
              quiz: Array.from({ length: 10 }).map((_, i) => ({
                id: `q${i + 1}`,
                type: 'mcq' as const,
                prompt: ls('Platzhalter-Frage', 'Platzhalter-Frage', 'Placeholder question'),
                choices: [ls('A', 'A', 'A'), ls('B', 'B', 'B'), ls('C', 'C', 'C'), ls('D', 'D', 'D')],
                correctIndex: 0,
              })),
              worksheets: [
                { id: 'ws1', title: ls('Aufgabenblatt 1', 'Aufgabenblatt 1', 'Worksheet 1') },
                { id: 'ws2', title: ls('Aufgabenblatt 2', 'Aufgabenblatt 2', 'Worksheet 2') },
              ],
            },
          ],
        },
        university: {
          id: 'university',
          title: ls('🎓 Universitet darajasi', '🎓 Universitätsniveau', '🎓 University level'),
          modules: [
            {
              id: 'molecular-biology',
              title: ls('Molekulyar biologiya', 'Molekularbiologie', 'Molecular biology'),
              description: ls('DNK, RNK, oqsillar.', 'DNA, RNA, Proteine.', 'DNA, RNA, proteins.'),
              sections: [
                { type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
                { type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
              ],
              quizTitle: ls('Quiz: Molekulyar', 'Quiz: Molekular', 'Quiz: Molecular'),
              quiz: Array.from({ length: 10 }).map((_, i) => ({
                id: `q${i + 1}`,
                type: 'mcq' as const,
                prompt: ls('Platzhalter-Frage', 'Platzhalter-Frage', 'Placeholder question'),
                choices: [ls('A', 'A', 'A'), ls('B', 'B', 'B'), ls('C', 'C', 'C'), ls('D', 'D', 'D')],
                correctIndex: 0,
              })),
              worksheets: [
                { id: 'ws1', title: ls('Aufgabenblatt 1', 'Aufgabenblatt 1', 'Worksheet 1') },
                { id: 'ws2', title: ls('Aufgabenblatt 2', 'Aufgabenblatt 2', 'Worksheet 2') },
                { id: 'ws3', title: ls('Aufgabenblatt 3', 'Aufgabenblatt 3', 'Worksheet 3') },
              ],
            },
          ],
        },
      },
    },
  },
};

