import type { Curriculum, LocalizedString, SubjectId } from './types';

const ls = (uz: string, de: string, en: string): LocalizedString => ({ uz, de, en });

const scienceSubjectTitle: Record<SubjectId, LocalizedString> = {
  math: ls('Matematika', 'Mathematik', 'Mathematics'),
  physics: ls('Fizika', 'Physik', 'Physics'),
  chemistry: ls('Kimyo', 'Chemie', 'Chemistry'),
  biology: ls('Biologiya', 'Biologie', 'Biology'),
  it: ls('Kompyuter Asoslari', 'IT-Grundlagen', 'IT Fundamentals'),
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
                {
                  type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(
                    "O'zgaruvchi — bu noma'lum sonni ifodalovchi harf (masalan, x yoki y). Ifoda — bu sonlar va o'zgaruvchilardan tashkil topgan matematik yozuv. Tenglama — bu ikki ifodaning tengligini ko'rsatadi, masalan: x + 3 = 7. Tenglamani yechish degani — x ning qiymatini topish. Buning uchun teskari amallardan foydalanamiz: qo'shishning teskari amali — ayirish, ko'paytirishning teskari amali — bo'lish.",
                    "Eine Variable ist ein Buchstabe (z. B. x oder y), der für eine unbekannte Zahl steht. Ein Term ist ein mathematischer Ausdruck aus Zahlen und Variablen, z. B. 3x + 2. Eine Gleichung zeigt die Gleichheit zweier Terme, z. B. x + 3 = 7. Das Lösen einer Gleichung bedeutet, den Wert der Variablen zu finden. Dazu verwenden wir Umkehroperationen: Die Umkehrung der Addition ist die Subtraktion, die der Multiplikation ist die Division. Ziel: Die Variable auf einer Seite isolieren.",
                    "A variable is a letter (e.g. x or y) representing an unknown number. An expression (term) is a mathematical phrase combining numbers and variables, e.g. 3x + 2. An equation shows that two expressions are equal, e.g. x + 3 = 7. Solving an equation means finding the value of the variable. We use inverse operations: the inverse of addition is subtraction, the inverse of multiplication is division. Goal: isolate the variable on one side."
                  )
                },
                {
                  type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls(
                    "1-misol: x + 5 = 12 → x = 12 - 5 = 7.\n2-misol: 3x = 18 → x = 18 / 3 = 6.\n3-misol: 2x + 4 = 10 → 2x = 6 → x = 3.\nHar bir qadamda teskari amalni qo'llaymiz.",
                    "Beispiel 1: x + 5 = 12 → x = 12 − 5 = 7.\nBeispiel 2: 3x = 18 → x = 18 ÷ 3 = 6.\nBeispiel 3: 2x + 4 = 10 → 2x = 6 → x = 3.\nIn jedem Schritt wenden wir die Umkehroperation an.",
                    "Example 1: x + 5 = 12 → x = 12 − 5 = 7.\nExample 2: 3x = 18 → x = 18 ÷ 3 = 6.\nExample 3: 2x + 4 = 10 → 2x = 6 → x = 3.\nIn each step we apply the inverse operation."
                  )
                },
                {
                  type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls(
                    "1) x + 8 = 15 ni yeching.\n2) 4x = 28 ni yeching.\n3) 5x − 3 = 22 ni yeching.\n4) x/2 + 7 = 11 ni yeching.\n5) 3(x + 2) = 21 ni yeching.",
                    "1) Löse x + 8 = 15.\n2) Löse 4x = 28.\n3) Löse 5x − 3 = 22.\n4) Löse x/2 + 7 = 11.\n5) Löse 3(x + 2) = 21.",
                    "1) Solve x + 8 = 15.\n2) Solve 4x = 28.\n3) Solve 5x − 3 = 22.\n4) Solve x/2 + 7 = 11.\n5) Solve 3(x + 2) = 21."
                  )
                },
                {
                  type: 'visuals', title: ls('Formulalar/Diagrammalar', 'Formeln/Diagramme', 'Formulas/Diagrams'), content: ls(
                    "Asosiy formulalar:\n• a + b = c → a = c − b\n• a × b = c → a = c / b\n• Distributiv qonun: a(b + c) = ab + ac\n\nXulosa: Algebra — o'zgaruvchilar bilan ishlashni o'rgatadi. Tenglamalarni yechish uchun teskari amallar va qoidalarni to'g'ri qo'llash kerak.",
                    "Wichtige Formeln:\n• a + b = c → a = c − b\n• a × b = c → a = c / b\n• Distributivgesetz: a(b + c) = ab + ac\n\nZusammenfassung: Algebra lehrt den Umgang mit Variablen. Zum Lösen von Gleichungen nutzen wir systematisch Umkehroperationen.",
                    "Key formulas:\n• a + b = c → a = c − b\n• a × b = c → a = c / b\n• Distributive law: a(b + c) = ab + ac\n\nSummary: Algebra teaches working with variables. To solve equations we systematically apply inverse operations."
                  )
                },
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
                {
                  type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(
                    "Koordinata tekisligi ikki o'qdan iborat: gorizontal x o'qi va vertikal y o'qi. Ular kesilgan nuqta — boshlanish nuqtasi (0, 0). Har bir nuqta (x, y) juftligi bilan ifodalanadi. Tekislik 4 chorakka bo'linadi. Ikki nuqta orasidagi masofa formulasi: d = √((x₂-x₁)² + (y₂-y₁)²).",
                    "Die Koordinatenebene besteht aus zwei Achsen: der horizontalen x-Achse und der vertikalen y-Achse. Ihr Schnittpunkt ist der Ursprung (0, 0). Jeder Punkt wird als Zahlenpaar (x, y) dargestellt. Die Ebene wird in vier Quadranten unterteilt. Die Abstandsformel lautet: d = √((x₂−x₁)² + (y₂−y₁)²).",
                    "The coordinate plane has two axes: the horizontal x-axis and the vertical y-axis. Their intersection is the origin (0, 0). Every point is represented as a pair (x, y). The plane is divided into four quadrants. The distance formula is: d = √((x₂−x₁)² + (y₂−y₁)²)."
                  )
                },
                {
                  type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls(
                    "1-misol: A(2, 3) va B(5, 7) orasidagi masofa: d = √((5-2)²+(7-3)²) = √(9+16) = √25 = 5.\n2-misol: O'rta nuqta: M = ((2+5)/2, (3+7)/2) = (3.5, 5).",
                    "Beispiel 1: Abstand A(2, 3) zu B(5, 7): d = √((5−2)²+(7−3)²) = √(9+16) = √25 = 5.\nBeispiel 2: Mittelpunkt: M = ((2+5)/2, (3+7)/2) = (3,5; 5).",
                    "Example 1: Distance from A(2, 3) to B(5, 7): d = √((5−2)²+(7−3)²) = √(9+16) = √25 = 5.\nExample 2: Midpoint: M = ((2+5)/2, (3+7)/2) = (3.5, 5)."
                  )
                },
                {
                  type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls(
                    "1) A(1,2) va B(4,6) orasidagi masofani toping.\n2) C(−3,5) qaysi chorakda joylashgan?\n3) P(0,4) va Q(3,0) o'rta nuqtasini toping.\n4) y = 2x + 1 to'g'ri chiziqda x=3 bo'lganda y ni toping.",
                    "1) Berechne den Abstand von A(1,2) zu B(4,6).\n2) In welchem Quadranten liegt C(−3,5)?\n3) Finde den Mittelpunkt von P(0,4) und Q(3,0).\n4) Berechne y für x=3 auf der Geraden y = 2x + 1.",
                    "1) Find the distance from A(1,2) to B(4,6).\n2) Which quadrant is C(−3,5) in?\n3) Find the midpoint of P(0,4) and Q(3,0).\n4) Find y when x=3 on the line y = 2x + 1."
                  )
                },
                {
                  type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls(
                    "Formulalar:\n• Masofa: d = √((x₂-x₁)²+(y₂-y₁)²)\n• O'rta nuqta: M = ((x₁+x₂)/2, (y₁+y₂)/2)\n• To'g'ri chiziq: y = mx + b (m — burchak koeffitsienti)\n\nXulosa: Koordinata tekisligi geometrik munosabatlarni raqamlar bilan ifodalash imkonini beradi.",
                    "Formeln:\n• Abstand: d = √((x₂−x₁)²+(y₂−y₁)²)\n• Mittelpunkt: M = ((x₁+x₂)/2, (y₁+y₂)/2)\n• Geradengleichung: y = mx + b (m = Steigung)\n\nZusammenfassung: Das Koordinatensystem ermöglicht es, geometrische Beziehungen durch Zahlen auszudrücken.",
                    "Formulas:\n• Distance: d = √((x₂−x₁)²+(y₂−y₁)²)\n• Midpoint: M = ((x₁+x₂)/2, (y₁+y₂)/2)\n• Line equation: y = mx + b (m = slope)\n\nSummary: The coordinate plane allows us to represent geometric relationships using numbers."
                  )
                },
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
                {
                  type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(
                    "Limit — bu funksiya qiymati ma'lum nuqtaga yaqinlashgandagi atrofidagi xatti-harakatni tavsiflaydi. lim(x→a) f(x) = L degani, x a ga yaqinlashganda f(x) L ga yaqinlashadi. Limitlar hosilalar va integrallar uchun asos hisoblanadi. Asosiy qoidalar: yig'indi limiti, ko'paytma limiti va bo'linma limiti.",
                    "Der Grenzwert beschreibt das Verhalten einer Funktion, wenn sich die Variable einem bestimmten Wert nähert. lim(x→a) f(x) = L bedeutet: Wenn x sich a nähert, nähert sich f(x) dem Wert L. Grenzwerte bilden die Grundlage für Ableitungen und Integrale. Wichtige Regeln: Summenregel, Produktregel und Quotientenregel für Grenzwerte.",
                    "A limit describes the behavior of a function as the variable approaches a particular value. lim(x→a) f(x) = L means: as x approaches a, f(x) approaches L. Limits form the foundation for derivatives and integrals. Key rules: sum rule, product rule, and quotient rule for limits."
                  )
                },
                {
                  type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls(
                    "1-misol: lim(x→3) (2x+1) = 2·3+1 = 7.\n2-misol: lim(x→0) (sin x / x) = 1 (muhim limit).\n3-misol: lim(x→∞) (1/x) = 0.",
                    "Beispiel 1: lim(x→3) (2x+1) = 2·3+1 = 7.\nBeispiel 2: lim(x→0) (sin x / x) = 1 (wichtiger Grenzwert).\nBeispiel 3: lim(x→∞) (1/x) = 0.",
                    "Example 1: lim(x→3) (2x+1) = 2·3+1 = 7.\nExample 2: lim(x→0) (sin x / x) = 1 (important limit).\nExample 3: lim(x→∞) (1/x) = 0."
                  )
                },
                {
                  type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls(
                    "1) lim(x→2) (x²−4)/(x−2) ni hisoblang.\n2) lim(x→0) (1−cos x)/x² ni toping.\n3) lim(x→∞) (3x²+1)/(x²+5) ni hisoblang.",
                    "1) Berechne lim(x→2) (x²−4)/(x−2).\n2) Bestimme lim(x→0) (1−cos x)/x².\n3) Berechne lim(x→∞) (3x²+1)/(x²+5).",
                    "1) Compute lim(x→2) (x²−4)/(x−2).\n2) Find lim(x→0) (1−cos x)/x².\n3) Compute lim(x→∞) (3x²+1)/(x²+5)."
                  )
                },
                {
                  type: 'visuals', title: ls('Formulalar', 'Formeln', 'Formulas'), content: ls(
                    "Formulalar:\n• lim(x→a) [f(x)±g(x)] = lim f(x) ± lim g(x)\n• lim(x→0) sin(x)/x = 1\n• L'Hôpital qoidasi: 0/0 yoki ∞/∞ holatlarda\n\nXulosa: Limitlar — matematik tahlilning poydevori. Funksiyaning chegaraviy xulqini tushunish hosilalar mavzusiga yo'l ochadi.",
                    "Formeln:\n• lim(x→a) [f(x)±g(x)] = lim f(x) ± lim g(x)\n• lim(x→0) sin(x)/x = 1\n• L'Hôpital: bei 0/0 oder ∞/∞\n\nZusammenfassung: Grenzwerte sind das Fundament der Analysis. Das Verständnis des Grenzwertverhaltens öffnet den Weg zu Ableitungen.",
                    "Formulas:\n• lim(x→a) [f(x)±g(x)] = lim f(x) ± lim g(x)\n• lim(x→0) sin(x)/x = 1\n• L'Hôpital's rule: for 0/0 or ∞/∞ forms\n\nSummary: Limits are the foundation of calculus. Understanding limit behavior opens the path to derivatives."
                  )
                },
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
                {
                  type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(
                    "Kuch — bu jismning holatini yoki shaklini o'zgartiruvchi ta'sir. Nyutonning 1-qonuni: Tashqi kuch ta'sir qilmasa, jism tinch turadi yoki tekis harakat qiladi (inersiya). 2-qonun: F = m·a (kuch = massa × tezlanish). 3-qonun: Har bir ta'sirga teng va qarama-qarshi ta'sir bo'ladi. Kuch birligi — Nyuton (N): 1 N = 1 kg·m/s².",
                    "Eine Kraft ist eine Einwirkung, die den Zustand oder die Form eines Körpers verändert. Newtons 1. Gesetz (Trägheit): Ohne äußere Kraft bleibt ein Körper in Ruhe oder bewegt sich gleichförmig. 2. Gesetz: F = m·a (Kraft = Masse × Beschleunigung). 3. Gesetz: Zu jeder Kraft gibt es eine gleich große Gegenkraft. Einheit: Newton (N): 1 N = 1 kg·m/s².",
                    "A force is an influence that changes a body's state or shape. Newton's 1st law (inertia): without external force, a body stays at rest or moves uniformly. 2nd law: F = m·a (force = mass × acceleration). 3rd law: every action has an equal and opposite reaction. Unit: Newton (N): 1 N = 1 kg·m/s²."
                  )
                },
                {
                  type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls(
                    "1-misol: 5 kg jismga 10 N kuch ta'sir qilsa: a = F/m = 10/5 = 2 m/s².\n2-misol: Og'irlik kuchi: F = m·g = 3 kg × 9.8 m/s² = 29.4 N.\n3-misol: Ikki kuch bir yo'nalishda: F = 5 N + 3 N = 8 N.",
                    "Beispiel 1: Auf 5 kg wirkt 10 N: a = F/m = 10/5 = 2 m/s².\nBeispiel 2: Gewichtskraft: F = m·g = 3 kg × 9,8 m/s² = 29,4 N.\nBeispiel 3: Zwei Kräfte in gleicher Richtung: F = 5 N + 3 N = 8 N.",
                    "Example 1: 10 N acts on 5 kg: a = F/m = 10/5 = 2 m/s².\nExample 2: Weight force: F = m·g = 3 kg × 9.8 m/s² = 29.4 N.\nExample 3: Two forces in same direction: F = 5 N + 3 N = 8 N."
                  )
                },
                {
                  type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls(
                    "1) 8 kg jismga 24 N kuch ta'sir qilganda tezlanishni toping.\n2) 60 kg odamning og'irlik kuchini hisoblang (g=9.8).\n3) 10 N va 6 N qarama-qarshi kuchlarning natijaviy kuchini toping.",
                    "1) Berechne die Beschleunigung bei 24 N auf 8 kg.\n2) Berechne die Gewichtskraft einer 60 kg schweren Person (g=9,8).\n3) Bestimme die resultierende Kraft von 10 N und 6 N in entgegengesetzter Richtung.",
                    "1) Find acceleration when 24 N acts on 8 kg.\n2) Calculate the weight force of a 60 kg person (g=9.8).\n3) Find the resultant of 10 N and 6 N in opposite directions."
                  )
                },
                {
                  type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls(
                    "Formulalar:\n• F = m·a\n• Og'irlik: W = m·g\n• Ishqalanish: f = μ·N\n\nXulosa: Nyuton qonunlari barcha mexanik hodisalarning asosi. Kuchlarni tushunish — fizikaning kaliti.",
                    "Formeln:\n• F = m·a\n• Gewicht: W = m·g\n• Reibung: f = μ·N\n\nZusammenfassung: Newtons Gesetze sind die Grundlage aller mechanischen Phänomene. Kräfte zu verstehen ist der Schlüssel zur Physik.",
                    "Formulas:\n• F = m·a\n• Weight: W = m·g\n• Friction: f = μ·N\n\nSummary: Newton's laws are the foundation of all mechanical phenomena. Understanding forces is the key to physics."
                  )
                },
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
                {
                  type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(
                    "Klassik mexanika jismlarning harakati va ularga ta'sir etuvchi kuchlarni o'rganadi. Kinematika harakat parametrlarini, dinamika esa kuchlarni tahlil qiladi. Asosiy tushunchalar: tezlik (v = Δx/Δt), tezlanish (a = Δv/Δt), kinetik energiya (E_k = ½mv²), potensial energiya (E_p = mgh). Energiyaning saqlanish qonuni: yopiq tizimda umumiy energiya o'zgarmaydi.",
                    "Die klassische Mechanik untersucht die Bewegung von Körpern und die wirkenden Kräfte. Kinematik beschreibt Bewegungsparameter, Dynamik analysiert Kräfte. Grundbegriffe: Geschwindigkeit (v = Δx/Δt), Beschleunigung (a = Δv/Δt), kinetische Energie (E_k = ½mv²), potentielle Energie (E_p = mgh). Energieerhaltungssatz: In einem geschlossenen System bleibt die Gesamtenergie konstant.",
                    "Classical mechanics studies the motion of bodies and the forces acting on them. Kinematics describes motion parameters; dynamics analyzes forces. Key concepts: velocity (v = Δx/Δt), acceleration (a = Δv/Δt), kinetic energy (E_k = ½mv²), potential energy (E_p = mgh). Conservation of energy: in a closed system the total energy remains constant."
                  )
                },
                {
                  type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls(
                    "1-misol: 2 kg jism 3 m/s tezlikda: E_k = ½·2·9 = 9 J.\n2-misol: 5 kg jism 10 m balandlikda: E_p = 5·9.8·10 = 490 J.\n3-misol: Erkin tushish: v = g·t = 9.8·3 = 29.4 m/s.",
                    "Beispiel 1: 2 kg bei 3 m/s: E_k = ½·2·9 = 9 J.\nBeispiel 2: 5 kg auf 10 m Höhe: E_p = 5·9,8·10 = 490 J.\nBeispiel 3: Freier Fall: v = g·t = 9,8·3 = 29,4 m/s.",
                    "Example 1: 2 kg at 3 m/s: E_k = ½·2·9 = 9 J.\nExample 2: 5 kg at 10 m height: E_p = 5·9.8·10 = 490 J.\nExample 3: Free fall: v = g·t = 9.8·3 = 29.4 m/s."
                  )
                },
                {
                  type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls(
                    "1) 4 kg jism 5 m/s tezlikda. Kinetik energiyani toping.\n2) Jism 20 m balandlikdan tushganda erga yetgandagi tezlikni hisoblang.\n3) 10 N kuch 3 m masofada bajargan ishni toping.",
                    "1) 4 kg bei 5 m/s. Berechne die kinetische Energie.\n2) Berechne die Geschwindigkeit beim Aufprall nach Fall aus 20 m.\n3) Berechne die Arbeit von 10 N über 3 m.",
                    "1) 4 kg at 5 m/s. Find the kinetic energy.\n2) Calculate the velocity on impact after falling from 20 m.\n3) Find the work done by 10 N over 3 m."
                  )
                },
                {
                  type: 'visuals', title: ls('Formulalar', 'Formeln', 'Formulas'), content: ls(
                    "Formulalar:\n• E_k = ½mv²\n• E_p = mgh\n• W = F·d·cosθ\n• v = v₀ + at\n\nXulosa: Klassik mexanika energiya va kuchlar orqali harakatni tahlil qilish imkonini beradi. Energiya saqlanishi — tabiatning asosiy qonuni.",
                    "Formeln:\n• E_k = ½mv²\n• E_p = mgh\n• W = F·d·cosθ\n• v = v₀ + at\n\nZusammenfassung: Die klassische Mechanik analysiert Bewegung durch Energie und Kräfte. Energieerhaltung ist ein fundamentales Naturgesetz.",
                    "Formulas:\n• E_k = ½mv²\n• E_p = mgh\n• W = F·d·cosθ\n• v = v₀ + at\n\nSummary: Classical mechanics analyzes motion through energy and forces. Conservation of energy is a fundamental law of nature."
                  )
                },
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
                {
                  type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(
                    "Atom — moddaning eng kichik za rrasi bo'lib, u yadro (protonlar va neytronlar) va elektronlardan iborat. Protonlar soni = atom raqami (Z). Periodik jadvalda elementlar atom raqamiga ko'ra joylashgan. Gruppalar (ustunlar) o'xshash kimyoviy xossalarga ega elementlarni birlashtiradi. Davrlar (qatorlar) elektron qobiqlarini ko'rsatadi.",
                    "Ein Atom ist das kleinste Teilchen eines Elements. Es besteht aus einem Kern (Protonen + Neutronen) und Elektronen. Die Protonenzahl = Ordnungszahl (Z). Im Periodensystem sind Elemente nach Ordnungszahl angeordnet. Gruppen (Spalten) fassen Elemente mit ähnlichen chemischen Eigenschaften zusammen. Perioden (Zeilen) zeigen die Elektronenschalen.",
                    "An atom is the smallest particle of an element. It consists of a nucleus (protons + neutrons) and electrons. The proton count = atomic number (Z). In the periodic table elements are arranged by atomic number. Groups (columns) contain elements with similar chemical properties. Periods (rows) indicate electron shells."
                  )
                },
                {
                  type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls(
                    "1-misol: Kislorod (O): Z=8, 8 proton, 8 elektron, 8 neytron (O-16).\n2-misol: Natriy (Na): Z=11, 1-gruppa — ishqoriy metall, oson elektron beradi.\n3-misol: Xlor (Cl): Z=17, 7-gruppa — galogen, elektron oladi.",
                    "Beispiel 1: Sauerstoff (O): Z=8, 8 Protonen, 8 Elektronen, 8 Neutronen (O-16).\nBeispiel 2: Natrium (Na): Z=11, Gruppe 1 — Alkalimetall, gibt leicht ein Elektron ab.\nBeispiel 3: Chlor (Cl): Z=17, Gruppe 7 — Halogen, nimmt ein Elektron auf.",
                    "Example 1: Oxygen (O): Z=8, 8 protons, 8 electrons, 8 neutrons (O-16).\nExample 2: Sodium (Na): Z=11, Group 1 — alkali metal, easily loses an electron.\nExample 3: Chlorine (Cl): Z=17, Group 7 — halogen, gains an electron."
                  )
                },
                {
                  type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls(
                    "1) Karbon (C) atomida nechta proton bor?\n2) Kaliy (K) qaysi gruppada joylashgan va xossalari qanday?\n3) Atom massasi 23, atom raqami 11 bo'lsa, neytronlar sonini toping.",
                    "1) Wie viele Protonen hat ein Kohlenstoffatom (C)?\n2) In welcher Gruppe steht Kalium (K) und welche Eigenschaften hat es?\n3) Atommasse 23, Ordnungszahl 11: Wie viele Neutronen?",
                    "1) How many protons does a carbon (C) atom have?\n2) Which group is potassium (K) in and what are its properties?\n3) Atomic mass 23, atomic number 11: how many neutrons?"
                  )
                },
                {
                  type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls(
                    "Formulalar:\n• Neytronlar = Atom massasi − Atom raqami\n• Elektronlar sonini = Protonlar soni (neytral atom)\n• Periodik jadvalda: chapdan o'ngga — metallik xossalar kamayadi\n\nXulosa: Periodik jadval kimyoning xaritasidir. Elementlarning joylashuvini tushunish ularning xulqini bashorat qilishga yordam beradi.",
                    "Formeln:\n• Neutronen = Atommasse − Ordnungszahl\n• Elektronenzahl = Protonenzahl (neutrales Atom)\n• Im PSE: von links nach rechts nimmt der metallische Charakter ab\n\nZusammenfassung: Das Periodensystem ist die Landkarte der Chemie. Die Position eines Elements verrät seine Eigenschaften.",
                    "Formulas:\n• Neutrons = Atomic mass − Atomic number\n• Electron count = Proton count (neutral atom)\n• In the periodic table: left to right, metallic character decreases\n\nSummary: The periodic table is the map of chemistry. An element's position reveals its properties."
                  )
                },
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
                {
                  type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(
                    "Termodinamika issiqlik, ish va energiya o'zaro bog'liqligini o'rganadi. 1-qonun: Energiya saqlanishi — ΔU = Q − W. 2-qonun: Entropiya yopiq tizimda doimo ortadi — jarayonlar qaytarilmas. Entalpiya (H): reaksiyaning issiqlik effekti. Gibbs energiyasi (G = H − TS): reaksiyaning o'z-o'zidan borishi mumkinligini ko'rsatadi.",
                    "Die Thermodynamik untersucht den Zusammenhang von Wärme, Arbeit und Energie. 1. Hauptsatz: Energieerhaltung — ΔU = Q − W. 2. Hauptsatz: Die Entropie nimmt in geschlossenen Systemen stets zu — Prozesse sind irreversibel. Enthalpie (H): Wärmeeffekt einer Reaktion. Gibbs-Energie (G = H − TS): zeigt, ob eine Reaktion spontan abläuft.",
                    "Thermodynamics studies the relationship between heat, work, and energy. 1st law: conservation of energy — ΔU = Q − W. 2nd law: entropy always increases in closed systems — processes are irreversible. Enthalpy (H): heat effect of a reaction. Gibbs energy (G = H − TS): indicates whether a reaction occurs spontaneously."
                  )
                },
                {
                  type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls(
                    "1-misol: Suvning bug'lanishi: ΔH > 0 (endotermik), ΔS > 0 (tartibsizlik ortadi).\n2-misol: 100 J issiqlik berildi, 40 J ish bajarildi: ΔU = 100 − 40 = 60 J.\n3-misol: ΔG < 0 bo'lsa, reaksiya o'z-o'zidan boradi.",
                    "Beispiel 1: Verdampfen von Wasser: ΔH > 0 (endotherm), ΔS > 0 (Unordnung steigt).\nBeispiel 2: 100 J Wärme zugeführt, 40 J Arbeit verrichtet: ΔU = 100 − 40 = 60 J.\nBeispiel 3: Wenn ΔG < 0, läuft die Reaktion spontan ab.",
                    "Example 1: Water evaporation: ΔH > 0 (endothermic), ΔS > 0 (disorder increases).\nExample 2: 100 J heat added, 40 J work done: ΔU = 100 − 40 = 60 J.\nExample 3: When ΔG < 0, the reaction is spontaneous."
                  )
                },
                {
                  type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls(
                    "1) 200 J issiqlik berildi, 80 J ish bajarildi. Ichki energiya o'zgarishini toping.\n2) ΔH = −50 kJ, ΔS = +100 J/K, T = 300 K. ΔG ni hisoblang.\n3) Qaysi jarayon entropiyani kamaytiradi: muzlash yoki erish?",
                    "1) 200 J Wärme, 80 J Arbeit. Berechne die Änderung der inneren Energie.\n2) ΔH = −50 kJ, ΔS = +100 J/K, T = 300 K. Berechne ΔG.\n3) Welcher Vorgang verringert die Entropie: Gefrieren oder Schmelzen?",
                    "1) 200 J heat, 80 J work. Find the change in internal energy.\n2) ΔH = −50 kJ, ΔS = +100 J/K, T = 300 K. Calculate ΔG.\n3) Which process decreases entropy: freezing or melting?"
                  )
                },
                {
                  type: 'visuals', title: ls('Formulalar', 'Formeln', 'Formulas'), content: ls(
                    "Formulalar:\n• ΔU = Q − W\n• ΔG = ΔH − TΔS\n• Entropiya: ΔS ≥ 0 (yopiq tizim)\n\nXulosa: Termodinamika energiya almashinuvi va reaksiyalarning yo'nalishini tushuntiradi. Gibbs energiyasi kimyoviy muvozanatni bashorat qilishda muhim.",
                    "Formeln:\n• ΔU = Q − W\n• ΔG = ΔH − TΔS\n• Entropie: ΔS ≥ 0 (geschl. System)\n\nZusammenfassung: Thermodynamik erklärt Energieaustausch und Reaktionsrichtung. Gibbs-Energie ist entscheidend für die Vorhersage chemischer Gleichgewichte.",
                    "Formulas:\n• ΔU = Q − W\n• ΔG = ΔH − TΔS\n• Entropy: ΔS ≥ 0 (closed system)\n\nSummary: Thermodynamics explains energy exchange and reaction direction. Gibbs energy is key for predicting chemical equilibria."
                  )
                },
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
                {
                  type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(
                    "Hujayra — tirik organizmlarning asosiy tuzilma birligi. Ikki tur mavjud: prokariot (yadrosiz, masalan bakteriyalar) va eukariot (yadroli). Asosiy qismlar: membrana (himoya va tashish), sitoplazma (kimyoviy reaksiyalar muhiti), yadro (DNK saqlaydi), mitoxondriya (energiya ishlab chiqaradi), ribosomalar (oqsil sintezi). O'simlik hujayralarida qo'shimcha: hujayra devori va xloroplast.",
                    "Die Zelle ist die grundlegende Struktureinheit aller Lebewesen. Zwei Typen: Prokaryot (ohne Zellkern, z. B. Bakterien) und Eukaryot (mit Zellkern). Hauptbestandteile: Zellmembran (Schutz und Transport), Zytoplasma (Medium für chem. Reaktionen), Zellkern (speichert DNA), Mitochondrien (Energieproduktion), Ribosomen (Proteinsynthese). Pflanzenzellen haben zusätzlich: Zellwand und Chloroplasten.",
                    "The cell is the fundamental structural unit of all living organisms. Two types: prokaryotic (no nucleus, e.g. bacteria) and eukaryotic (with nucleus). Main components: cell membrane (protection and transport), cytoplasm (medium for chemical reactions), nucleus (stores DNA), mitochondria (energy production), ribosomes (protein synthesis). Plant cells additionally have: cell wall and chloroplasts."
                  )
                },
                {
                  type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls(
                    "1-misol: Qizil qon hujayralari — kislorod tashiydi, yadrosiz (eukariot, lekin yadrosini yo'qotgan).\n2-misol: Neyron — uzun akson orqali signal uzatadi.\n3-misol: O'simlik hujayrasidagi xloroplast fotosintez jarayonini amalga oshiradi.",
                    "Beispiel 1: Rote Blutkörperchen — transportieren Sauerstoff, kernlos (eukaryotisch, aber Kern verloren).\nBeispiel 2: Neuron — leitet Signale über das Axon weiter.\nBeispiel 3: Chloroplasten in Pflanzenzellen führen die Photosynthese durch.",
                    "Example 1: Red blood cells — carry oxygen, no nucleus (eukaryotic, but lost nucleus).\nExample 2: Neuron — transmits signals through its axon.\nExample 3: Chloroplasts in plant cells carry out photosynthesis."
                  )
                },
                {
                  type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls(
                    "1) Prokariot va eukariot hujayralar orasidagi 3 ta farqni sanab bering.\n2) Mitoxondriyaning asosiy vazifasi nima?\n3) O'simlik hujayrasida bo'lib, hayvon hujayrasida bo'lmagan organellani nomlang.",
                    "1) Nenne 3 Unterschiede zwischen Prokaryoten und Eukaryoten.\n2) Was ist die Hauptfunktion der Mitochondrien?\n3) Nenne ein Organell, das in Pflanzenzellen vorkommt, aber nicht in Tierzellen.",
                    "1) List 3 differences between prokaryotic and eukaryotic cells.\n2) What is the main function of mitochondria?\n3) Name an organelle found in plant cells but not in animal cells."
                  )
                },
                {
                  type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls(
                    "Hujayra tuzilishi:\n• Membrana → Sitoplazma → Yadro\n• Mitoxondriya: ATP ishlab chiqarish\n• Ribosoma: oqsil sintezi\n\nXulosa: Hujayra — hayotning eng kichik birligi. Har bir organella maxsus vazifani bajaradi va ularning hamkorligi hayotiy jarayonlarni ta'minlaydi.",
                    "Zellaufbau:\n• Membran → Zytoplasma → Kern\n• Mitochondrien: ATP-Produktion\n• Ribosomen: Proteinsynthese\n\nZusammenfassung: Die Zelle ist die kleinste Einheit des Lebens. Jedes Organell hat eine spezifische Aufgabe; ihr Zusammenspiel ermöglicht Lebensprozesse.",
                    "Cell structure:\n• Membrane → Cytoplasm → Nucleus\n• Mitochondria: ATP production\n• Ribosomes: protein synthesis\n\nSummary: The cell is the smallest unit of life. Each organelle performs a specific function; their cooperation enables life processes."
                  )
                },
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
                {
                  type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(
                    "Molekulyar biologiya DNK, RNK va oqsillarning tuzilishi hamda funksiyasini o'rganadi. DNK (dezoksiribonuklein kislotasi) ikki spiralli tuzilishga ega va genetik axborotni saqlaydi. RNK DNKdan axborotni ko'chirib, oqsil sintezida vositachilik qiladi. Markaziy dogma: DNK → RNK → Oqsil. Replikatsiya — DNKning nusxalanishi, transkripsiya — DNKdan RNK hosil bo'lishi, translyatsiya — RNK asosida oqsil sintezi.",
                    "Die Molekularbiologie untersucht Struktur und Funktion von DNA, RNA und Proteinen. DNA (Desoxyribonukleinsäure) hat eine Doppelhelixstruktur und speichert genetische Information. RNA kopiert die Information der DNA und vermittelt die Proteinsynthese. Zentrales Dogma: DNA → RNA → Protein. Replikation — DNA-Verdopplung, Transkription — RNA-Synthese aus DNA, Translation — Proteinsynthese anhand von RNA.",
                    "Molecular biology studies the structure and function of DNA, RNA, and proteins. DNA (deoxyribonucleic acid) has a double helix structure and stores genetic information. RNA copies information from DNA and mediates protein synthesis. Central dogma: DNA → RNA → Protein. Replication — DNA copying, transcription — RNA synthesis from DNA, translation — protein synthesis from RNA."
                  )
                },
                {
                  type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls(
                    "1-misol: ATG kodoni — metionin aminokislotasini kodlaydi (start kodon).\n2-misol: DNK replikatsiyasida A-T va G-C juftlashadi (Chargaff qoidasi).\n3-misol: mRNK uzunligi 300 nukleotid bo'lsa, 100 aminokislotali oqsil hosil bo'ladi.",
                    "Beispiel 1: Codon ATG — kodiert Methionin (Startcodon).\nBeispiel 2: Bei der DNA-Replikation paaren sich A-T und G-C (Chargaff-Regel).\nBeispiel 3: Eine mRNA mit 300 Nukleotiden ergibt ein Protein mit 100 Aminosäuren.",
                    "Example 1: Codon ATG — encodes methionine (start codon).\nExample 2: In DNA replication, A pairs with T and G with C (Chargaff's rule).\nExample 3: An mRNA of 300 nucleotides yields a protein of 100 amino acids."
                  )
                },
                {
                  type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls(
                    "1) DNK va RNK orasidagi 3 ta farqni ayting.\n2) Agar DNK zanjirida ATGCCA ketma-ketlik bo'lsa, komplementar zanjirni yozing.\n3) 600 nukleotidli mRNK nechta aminokislotali oqsilni kodlaydi?",
                    "1) Nenne 3 Unterschiede zwischen DNA und RNA.\n2) Wenn ein DNA-Strang ATGCCA lautet, wie ist der komplementäre Strang?\n3) Wie viele Aminosäuren kodiert eine mRNA mit 600 Nukleotiden?",
                    "1) List 3 differences between DNA and RNA.\n2) If a DNA strand reads ATGCCA, what is the complementary strand?\n3) How many amino acids does an mRNA of 600 nucleotides encode?"
                  )
                },
                {
                  type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls(
                    "Markaziy dogma:\nDNK →(transkripsiya)→ RNK →(translyatsiya)→ Oqsil\n• Kodon = 3 nukleotid = 1 aminokislota\n• A-T, G-C juftlanish\n\nXulosa: Molekulyar biologiya hayotning genetik asoslarini tushuntiradi. DNK — barcha tirik organizmlarning universal ma'lumot saqlagichi.",
                    "Zentrales Dogma:\nDNA →(Transkription)→ RNA →(Translation)→ Protein\n• Codon = 3 Nukleotide = 1 Aminosäure\n• A-T, G-C Basenpaarung\n\nZusammenfassung: Die Molekularbiologie erklärt die genetischen Grundlagen des Lebens. DNA ist der universelle Informationsspeicher aller Lebewesen.",
                    "Central dogma:\nDNA →(transcription)→ RNA →(translation)→ Protein\n• Codon = 3 nucleotides = 1 amino acid\n• A-T, G-C base pairing\n\nSummary: Molecular biology explains the genetic foundations of life. DNA is the universal information store of all living organisms."
                  )
                },
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
    it: {
      id: 'it',
      title: scienceSubjectTitle.it,
      levels: {
        school: {
          id: 'school',
          title: ls('📗 Maktab darajasi', '📗 Schulniveau', '📗 School level'),
          modules: [
            {
              id: 'hardware-basics',
              title: ls('Raqamli qurilmalar', 'Rechneraufbau', 'Computer Hardware'),
              description: ls('CPU, RAM, SSD va boshqa komponentlar.', 'CPU, RAM, SSD und andere Komponenten.', 'CPU, RAM, SSD and other components.'),
              sections: [
                {
                  type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(
                    "Kompyuter asosiy 5 qismdan iborat: CPU (markaziy protsessor — buyruqlarni bajaradi), RAM (tezkor xotira — vaqtinchalik ma'lumot), SSD/HDD (doimiy xotira), Anakart (barcha qismlarni ulaydi), GPU (grafik protsessor). CPU tezligi GHz da o'lchanadi. RAM hajmi GB da. SSD HDD dan tezroq ishlaydi.",
                    "Ein Computer besteht aus 5 Hauptkomponenten: CPU (führt Befehle aus), RAM (Arbeitsspeicher), SSD/HDD (Massenspeicher), Mainboard (verbindet alle Teile), GPU (Grafikprozessor). CPU-Takt in GHz. RAM in GB. SSD ist schneller als HDD.",
                    "A computer has 5 main components: CPU (executes instructions), RAM (working memory), SSD/HDD (permanent storage), motherboard (connects all parts), GPU (graphics processor). CPU speed in GHz. RAM in GB. SSD is faster than HDD."
                  )
                },
                {
                  type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls(
                    "1-misol: Intel Core i7 — 4.0 GHz, 8 yadroli CPU.\n2-misol: 16 GB RAM — brauzer, IDE va musiqa bir vaqtda ishlaydi.\n3-misol: 512 GB NVMe SSD — tizim 10 soniyada yuklanadi.",
                    "Beispiel 1: Intel Core i7 — 8-Kern-CPU mit 4,0 GHz.\nBeispiel 2: 16 GB RAM — Browser, IDE und Musik gleichzeitig.\nBeispiel 3: 512 GB NVMe SSD — System startet in 10 Sekunden.",
                    "Example 1: Intel Core i7 — 8-core CPU at 4.0 GHz.\nExample 2: 16 GB RAM — browser, IDE, and music simultaneously.\nExample 3: 512 GB NVMe SSD — system boots in 10 seconds."
                  )
                },
                {
                  type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls(
                    "1) CPU va GPU orasidagi asosiy farqni tushuntiring.\n2) 8 GB va 32 GB RAM orasidagi amaliy farq qanday?\n3) HDD va SSD afzalliklari va kamchiliklarini solishtiring.",
                    "1) Erkläre den Hauptunterschied zwischen CPU und GPU.\n2) Was ist der praktische Unterschied zwischen 8 GB und 32 GB RAM?\n3) Vergleiche Vor- und Nachteile von HDD und SSD.",
                    "1) Explain the main difference between CPU and GPU.\n2) What is the practical difference between 8 GB and 32 GB RAM?\n3) Compare the advantages and disadvantages of HDD and SSD."
                  )
                },
                {
                  type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls(
                    "Kompyuter arxitekturasi:\nCPU ↔ RAM ↔ SSD/HDD\n\nXulosa: Kompyuter komponentlarini tushunish texnik muammolarni hal qilish va to'g'ri jihozlarni tanlashga yordam beradi.",
                    "Computerarchitektur:\nCPU ↔ RAM ↔ SSD/HDD\n\nZusammenfassung: Hardwarekomponenten zu verstehen hilft bei der Fehlersuche und Hardwareauswahl.",
                    "Computer architecture:\nCPU ↔ RAM ↔ SSD/HDD\n\nSummary: Understanding hardware components helps with troubleshooting and selecting equipment."
                  )
                },
              ],
              quizTitle: ls('Quiz: Aparatura', 'Quiz: Hardware', 'Quiz: Hardware'),
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
            {
              id: 'networks',
              title: ls('Tarmoqlar', 'Netzwerke', 'Networks'),
              description: ls('LAN, WAN va Internet asoslari.', 'LAN, WAN und Internet-Grundlagen.', 'LAN, WAN and Internet basics.'),
              sections: [
                {
                  type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(
                    "Tarmoq — ikki yoki undan ortiq qurilmalarning o'zaro ulanishi. LAN (mahalliy) — bir bino ichida. WAN — shaharlar orasida. Internet — eng katta WAN. IP-manzil — har bir qurilmaning raqami. Router tarmoqlarni, Switch LAN ichida paketlarni yo'naltiradi.",
                    "Ein Netzwerk verbindet zwei oder mehr Geräte. LAN — innerhalb eines Gebäudes. WAN — zwischen Städten. Internet ist das größte WAN. IP-Adresse — eindeutige Kennung. Router verbindet Netzwerke, Switch leitet Pakete im LAN weiter.",
                    "A network connects two or more devices. LAN — within one building. WAN — across cities. Internet is the largest WAN. IP address — unique identifier. Router connects networks, switch forwards packets within a LAN."
                  )
                },
                {
                  type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls(
                    "1-misol: Uy tarmoqi: modem → router → Wi-Fi → qurilmalar.\n2-misol: IP manzil: 192.168.1.1 — router standart manzili.\n3-misol: ping google.com — tarmoq ulanishini tekshirish.",
                    "Beispiel 1: Heimnetzwerk: Modem → Router → Wi-Fi → Geräte.\nBeispiel 2: IP 192.168.1.1 — Standard-Routeradresse.\nBeispiel 3: ping google.com — Verbindung testen.",
                    "Example 1: Home network: modem → router → Wi-Fi → devices.\nExample 2: IP 192.168.1.1 — default router address.\nExample 3: ping google.com — test connectivity."
                  )
                },
                {
                  type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls(
                    "1) LAN va WAN farqini tushuntiring.\n2) Router va Switch farqi nima?\n3) O'z kompyuteringizing IP manzilini qanday topasiz?",
                    "1) Erkläre den Unterschied zwischen LAN und WAN.\n2) Was ist der Unterschied zwischen Router und Switch?\n3) Wie findest du deine IP-Adresse?",
                    "1) Explain the difference between LAN and WAN.\n2) What is the difference between a router and a switch?\n3) How do you find your computer's IP address?"
                  )
                },
                {
                  type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls(
                    "Tarmoq tuzilishi:\nInternet ↔ Modem ↔ Router ↔ Qurilmalar\n\nXulosa: Tarmoqlar zamonaviy texnologiyaning asosi. IP va DNS ni tushunish har bir IT mutaxassisi uchun zarur.",
                    "Netzwerktopologie:\nInternet ↔ Modem ↔ Router ↔ Geräte\n\nZusammenfassung: Netzwerke sind Basis moderner Technologie. IP und DNS zu verstehen ist essenziell.",
                    "Network topology:\nInternet ↔ Modem ↔ Router ↔ Devices\n\nSummary: Networks are the foundation of modern technology. Understanding IP and DNS is essential."
                  )
                },
              ],
              quizTitle: ls('Quiz: Tarmoq', 'Quiz: Netzwerk', 'Quiz: Networks'),
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
            {
              id: 'security',
              title: ls('Xavfsizlik', 'Sicherheit', 'Security'),
              description: ls('Kriptografiya, parollar va himoya.', 'Kryptografie, Passwörter und Schutz.', 'Encryption, passwords, and protection.'),
              sections: [
                {
                  type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(
                    "IT xavfsizligi ma'lumotlarni ruxsatsiz kirishdan himoya qilishni o'rganadi. Kriptografiya — ma'lumotni shifrlash usullari. Simmetrik shifrlash (bir kalit), asimmetrik (ochiq/yopiq kalit). Parol xavfsizligi: kamida 12 belgi, harflar + raqamlar + maxsus belgilar. Ikki bosqichli autentifikatsiya (2FA) xavfsizlikni oshiradi. Malware, phishing va social engineering — asosiy tahdidlar.",
                    "IT-Sicherheit schützt Daten vor unbefugtem Zugriff. Kryptografie — Verschlüsselungsmethoden. Symmetrisch (ein Schlüssel), asymmetrisch (öffentlicher/privater Schlüssel). Passwortsicherheit: mind. 12 Zeichen, Buchstaben + Zahlen + Sonderzeichen. Zwei-Faktor-Authentifizierung (2FA) erhöht die Sicherheit. Malware, Phishing und Social Engineering — Hauptbedrohungen.",
                    "IT security protects data from unauthorized access. Cryptography — encryption methods. Symmetric (one key), asymmetric (public/private key). Password security: at least 12 characters, letters + numbers + special characters. Two-factor authentication (2FA) increases security. Malware, phishing, and social engineering — main threats."
                  )
                },
                {
                  type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls(
                    "1-misol: HTTPS — veb-saytlar bilan shifrlangan aloqa (TLS sertifikati).\n2-misol: 'Parol123' — zaif parol; 'K#9mL!xQ2p&v' — kuchli parol.\n3-misol: Phishing — soxta email orqali parol o'g'irlash urinishi.",
                    "Beispiel 1: HTTPS — verschlüsselte Kommunikation mit Websites (TLS-Zertifikat).\nBeispiel 2: 'Passwort123' — schwach; 'K#9mL!xQ2p&v' — stark.\nBeispiel 3: Phishing — Versuch, Passwörter per gefälschter E-Mail zu stehlen.",
                    "Example 1: HTTPS — encrypted communication with websites (TLS certificate).\nExample 2: 'Password123' — weak; 'K#9mL!xQ2p&v' — strong.\nExample 3: Phishing — attempt to steal passwords via fake email."
                  )
                },
                {
                  type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls(
                    "1) Simmetrik va asimmetrik shifrlash farqini tushuntiring.\n2) Kuchli parol uchun 3 ta tavsiya bering.\n3) Phishing hujumini qanday aniqlash mumkin?",
                    "1) Erkläre den Unterschied zwischen symmetrischer und asymmetrischer Verschlüsselung.\n2) Nenne 3 Tipps für ein starkes Passwort.\n3) Wie erkennt man einen Phishing-Angriff?",
                    "1) Explain the difference between symmetric and asymmetric encryption.\n2) Give 3 tips for a strong password.\n3) How can you identify a phishing attack?"
                  )
                },
                {
                  type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls(
                    "Xavfsizlik qatlamlari:\n• Shifrlash (HTTPS, TLS)\n• Autentifikatsiya (parol + 2FA)\n• Firewall\n\nXulosa: Raqamli dunyoda xavfsizlik har bir foydalanuvchi uchun muhim. Kuchli parollar va 2FA — birinchi mudofaa chizig'i.",
                    "Sicherheitsschichten:\n• Verschlüsselung (HTTPS, TLS)\n• Authentifizierung (Passwort + 2FA)\n• Firewall\n\nZusammenfassung: In der digitalen Welt ist Sicherheit für jeden wichtig. Starke Passwörter und 2FA sind die erste Verteidigungslinie.",
                    "Security layers:\n• Encryption (HTTPS, TLS)\n• Authentication (password + 2FA)\n• Firewall\n\nSummary: In the digital world, security matters for everyone. Strong passwords and 2FA are the first line of defense."
                  )
                },
              ],
              quizTitle: ls('Quiz: Xavfsizlik', 'Quiz: Sicherheit', 'Quiz: Security'),
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
              id: 'databases',
              title: ls('Ma\'lumot bazalari', 'Datenbanken', 'Databases'),
              description: ls('SQL va relational modellar.', 'SQL und relationale Modelle.', 'SQL and relational models.'),
              sections: [
                {
                  type: 'theory', title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(
                    "Ma'lumotlar bazasi — tizimli ravishda saqlangan ma'lumotlar to'plami. Relatsion model jadvallar (tablitsalar) asosida ishlaydi. Har bir jadval ustun (maydon) va qatorlardan (yozuvlar) iborat. SQL — ma'lumotlarni boshqarish tili. Asosiy buyruqlar: SELECT (o'qish), INSERT (qo'shish), UPDATE (yangilash), DELETE (o'chirish). Birlamchi kalit (PRIMARY KEY) — har bir yozuvni yagona aniqlaydi.",
                    "Eine Datenbank ist eine systematisch gespeicherte Datensammlung. Das relationale Modell arbeitet mit Tabellen. Jede Tabelle hat Spalten (Felder) und Zeilen (Datensätze). SQL ist die Sprache zur Datenverwaltung. Hauptbefehle: SELECT (lesen), INSERT (einfügen), UPDATE (aktualisieren), DELETE (löschen). Primärschlüssel (PRIMARY KEY) identifiziert jeden Datensatz eindeutig.",
                    "A database is a systematically stored data collection. The relational model works with tables. Each table has columns (fields) and rows (records). SQL is the language for data management. Main commands: SELECT (read), INSERT (add), UPDATE (modify), DELETE (remove). Primary key (PRIMARY KEY) uniquely identifies each record."
                  )
                },
                {
                  type: 'examples', title: ls('Misollar', 'Beispiele', 'Examples'), content: ls(
                    "1-misol: SELECT * FROM talabalar WHERE yosh > 18;\n2-misol: INSERT INTO talabalar (ism, yosh) VALUES ('Ali', 20);\n3-misol: JOIN — ikki jadvalni bog'lash: SELECT * FROM buyurtmalar JOIN mijozlar ON buyurtmalar.mijoz_id = mijozlar.id;",
                    "Beispiel 1: SELECT * FROM studenten WHERE alter > 18;\nBeispiel 2: INSERT INTO studenten (name, alter) VALUES ('Ali', 20);\nBeispiel 3: JOIN — zwei Tabellen verbinden: SELECT * FROM bestellungen JOIN kunden ON bestellungen.kunden_id = kunden.id;",
                    "Example 1: SELECT * FROM students WHERE age > 18;\nExample 2: INSERT INTO students (name, age) VALUES ('Ali', 20);\nExample 3: JOIN — linking two tables: SELECT * FROM orders JOIN customers ON orders.customer_id = customers.id;"
                  )
                },
                {
                  type: 'exercises', title: ls("Mashqlar", 'Übungsaufgaben', 'Exercises'), content: ls(
                    "1) Barcha talabalarni ismlari bo'yicha tartiblash uchun SQL yozing.\n2) PRIMARY KEY va FOREIGN KEY farqini tushuntiring.\n3) 'mahsulotlar' jadvaliga yangi yozuv qo'shing.",
                    "1) Schreibe SQL, um alle Studenten nach Namen zu sortieren.\n2) Erkläre den Unterschied zwischen PRIMARY KEY und FOREIGN KEY.\n3) Füge einen neuen Datensatz in die Tabelle 'produkte' ein.",
                    "1) Write SQL to sort all students by name.\n2) Explain the difference between PRIMARY KEY and FOREIGN KEY.\n3) Insert a new record into the 'products' table."
                  )
                },
                {
                  type: 'visuals', title: ls('Diagrammalar', 'Diagramme', 'Diagrams'), content: ls(
                    "SQL buyruqlari:\n• SELECT — o'qish\n• INSERT — qo'shish\n• UPDATE — yangilash\n• DELETE — o'chirish\n\nXulosa: Ma'lumotlar bazalari zamonaviy dasturlarning asosi. SQL tilini bilish har qanday dasturchi uchun zaruriy ko'nikma.",
                    "SQL-Befehle:\n• SELECT — lesen\n• INSERT — einfügen\n• UPDATE — aktualisieren\n• DELETE — löschen\n\nZusammenfassung: Datenbanken sind die Grundlage moderner Anwendungen. SQL zu beherrschen ist eine unverzichtbare Fähigkeit.",
                    "SQL commands:\n• SELECT — read\n• INSERT — add\n• UPDATE — modify\n• DELETE — remove\n\nSummary: Databases are the foundation of modern applications. Mastering SQL is an essential skill for any developer."
                  )
                },
              ],
              quizTitle: ls('Quiz: Baza', 'Quiz: Datenbanken', 'Quiz: Databases'),
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

