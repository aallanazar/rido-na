import type { LocalizedString } from '@/lib/curriculum/types';
import type { Course, CodingCourseId, CourseFeature } from './types';
import { ls, makeHomeworks, makeMaterials, makeQuiz10 } from './helpers';
import { typescriptModules } from './content/typescriptData';

type CodingCourseMeta = {
  id: CodingCourseId;
  title: LocalizedString;
  description: LocalizedString;
  features: CourseFeature[];
  topics: {
    uz: string[];
    de: string[];
    en: string[];
  }; // 15 topics per language
};

const mkTopics = (uz: string[], de: string[], en: string[]) => ({ uz, de, en });

const codingCoursesMeta: CodingCourseMeta[] = [
  {
    id: 'python',
    title: ls('Python', 'Python', 'Python'),
    description: ls("Python bilan dasturlash asoslari va amaliyot.", 'Python-Grundlagen und Praxis.', 'Python fundamentals and practice.'),
    features: ['code-editor'],
    topics: mkTopics(
      ['Sintaksis va o‘zgaruvchilar', 'Shartlar va sikllar', 'Funksiyalar', "Ro'yxatlar va lug'atlar", 'Fayllar', 'Modullar', 'OOP', 'Xatolar', 'Testlar', 'Kichik loyiha', 'API kirish', 'Ma’lumotlar tuzilmalari', 'Algoritmlar', 'Performance', 'Final loyiha'],
      ['Syntax & Variablen', 'Bedingungen & Schleifen', 'Funktionen', 'Listen & Dictionaries', 'Dateien', 'Module', 'OOP', 'Fehlerbehandlung', 'Tests', 'Mini-Projekt', 'API-Einstieg', 'Datenstrukturen', 'Algorithmen', 'Performance', 'Abschlussprojekt'],
      ['Syntax & variables', 'Conditions & loops', 'Functions', 'Lists & dictionaries', 'Files', 'Modules', 'OOP', 'Error handling', 'Testing', 'Mini project', 'API intro', 'Data structures', 'Algorithms', 'Performance', 'Capstone project']
    ),
  },
  {
    id: 'javascript',
    title: ls('JavaScript', 'JavaScript', 'JavaScript'),
    description: ls('Brauzer va Web uchun JS.', 'JS für Browser und Web.', 'JS for browser and web.'),
    features: ['code-editor', 'live-preview'],
    topics: mkTopics(
      ['Asoslar', 'DOM', 'Eventlar', 'Massivlar', 'Funksiyalar', 'Asinxronlik', 'Fetch', 'Modullar', 'OOP', 'Xatolar', 'Formalar', 'Web Storage', 'Kichik web loyiha', 'Debug', 'Final loyiha'],
      ['Grundlagen', 'DOM', 'Events', 'Arrays', 'Funktionen', 'Async', 'Fetch', 'Module', 'OOP', 'Fehler', 'Formulare', 'Web Storage', 'Mini-Webprojekt', 'Debugging', 'Abschlussprojekt'],
      ['Basics', 'DOM', 'Events', 'Arrays', 'Functions', 'Async', 'Fetch', 'Modules', 'OOP', 'Errors', 'Forms', 'Web Storage', 'Mini web project', 'Debugging', 'Capstone project']
    ),
  },
  {
    id: 'typescript',
    title: ls('TypeScript', 'TypeScript', 'TypeScript'),
    description: ls('Tiplangan JavaScript.', 'Getyptes JavaScript.', 'Typed JavaScript.'),
    features: ['code-editor'],
    topics: mkTopics(
      ['Kirish va Asoslar', 'Interfeyslar', 'Funksiyalar', 'Generiklar', 'Klasslar & OOP', 'Enumlar', 'Type Guards', 'Murakkab Tiplar', 'Utility Types', 'Modullar', 'Dekoratorlar', 'Async/Await', 'Patterns', 'React', 'Loyiha'],
      ['Einführung', 'Interfaces', 'Funktionen', 'Generics', 'Klassen & OOP', 'Enums', 'Type Guards', 'Advanced Types', 'Utility Types', 'Module', 'Decorators', 'Async/Await', 'Patterns', 'React', 'Projekt'],
      ['Introduction', 'Interfaces', 'Functions', 'Generics', 'Classes & OOP', 'Enums', 'Type Guards', 'Advanced Types', 'Utility Types', 'Modules', 'Decorators', 'Async/Await', 'Patterns', 'React', 'Project']
    ),
  },
  {
    id: 'css',
    title: ls('CSS', 'CSS', 'CSS'),
    description: ls('Stil va layout asoslari.', 'Styling und Layout.', 'Styling and layout.'),
    features: ['code-editor', 'live-preview'],
    topics: mkTopics(
      ['Selectors', 'Box model', 'Typography', 'Flexbox', 'Grid', 'Responsive', 'Colors', 'Animations', 'Forms', 'Variables', 'BEM', 'Tailwind intro', 'Mini UI', 'Accessibility', 'Final loyiha'],
      ['Selektoren', 'Box-Model', 'Typografie', 'Flexbox', 'Grid', 'Responsive', 'Farben', 'Animationen', 'Formulare', 'Variablen', 'BEM', 'Tailwind Intro', 'Mini UI', 'Accessibility', 'Abschlussprojekt'],
      ['Selectors', 'Box model', 'Typography', 'Flexbox', 'Grid', 'Responsive', 'Colors', 'Animations', 'Forms', 'Variables', 'BEM', 'Tailwind intro', 'Mini UI', 'Accessibility', 'Capstone project']
    ),
  },
  {
    id: 'react',
    title: ls('React JS', 'React JS', 'React JS'),
    description: ls('Komponentlar va state.', 'Komponenten und State.', 'Components and state.'),
    features: ['code-editor'],
    topics: mkTopics(
      ['JSX', 'Props', 'State', 'Effects', 'Forms', 'Lists', 'Routing', 'Context', 'Hooks', 'Data fetching', 'Performance', 'Testing', 'Patterns', 'Mini app', 'Capstone'],
      ['JSX', 'Props', 'State', 'Effects', 'Formulare', 'Listen', 'Routing', 'Context', 'Hooks', 'Data Fetching', 'Performance', 'Testing', 'Patterns', 'Mini-App', 'Abschlussprojekt'],
      ['JSX', 'Props', 'State', 'Effects', 'Forms', 'Lists', 'Routing', 'Context', 'Hooks', 'Data fetching', 'Performance', 'Testing', 'Patterns', 'Mini app', 'Capstone']
    ),
  },
  {
    id: 'react-native',
    title: ls('React Native', 'React Native', 'React Native'),
    description: ls('Mobil ilovalar uchun React.', 'React für Mobile.', 'React for mobile apps.'),
    features: ['code-editor'],
    topics: mkTopics(
      ['Setup', 'Components', 'Navigation', 'State', 'Styling', 'Lists', 'Forms', 'Storage', 'Networking', 'Permissions', 'Animations', 'Testing', 'Build', 'Mini app', 'Capstone'],
      ['Setup', 'Komponenten', 'Navigation', 'State', 'Styling', 'Listen', 'Formulare', 'Storage', 'Networking', 'Permissions', 'Animationen', 'Testing', 'Build', 'Mini-App', 'Abschlussprojekt'],
      ['Setup', 'Components', 'Navigation', 'State', 'Styling', 'Lists', 'Forms', 'Storage', 'Networking', 'Permissions', 'Animations', 'Testing', 'Build', 'Mini app', 'Capstone']
    ),
  },
  {
    id: 'linux',
    title: ls('Linux', 'Linux (System & Terminal)', 'Linux (System & Terminal)'),
    description: ls('Terminal, fayl tizimi va huquqlar.', 'Terminal, Dateisystem und Rechte.', 'Terminal, filesystem, and permissions.'),
    features: ['terminal'],
    topics: mkTopics(
      ['Terminal asoslari', 'Fayl tizimi', 'ls/cd/pwd', 'mkdir/touch', 'cat/echo/grep', 'Pipe & redirect', 'Permissions', 'Users & groups', 'Processes', 'Services', 'Networking', 'SSH', 'Shell scripting', 'Server basics', 'Final'],
      ['Terminal-Grundlagen', 'Dateisystem', 'ls/cd/pwd', 'mkdir/touch', 'cat/echo/grep', 'Pipes & Redirects', 'Berechtigungen', 'User & Groups', 'Prozesse', 'Services', 'Networking', 'SSH', 'Shell-Scripting', 'Server-Grundlagen', 'Final'],
      ['Terminal basics', 'Filesystem', 'ls/cd/pwd', 'mkdir/touch', 'cat/echo/grep', 'Pipes & redirects', 'Permissions', 'Users & groups', 'Processes', 'Services', 'Networking', 'SSH', 'Shell scripting', 'Server basics', 'Final']
    ),
  },
];

const remaining: CodingCourseMeta[] = [
  {
    id: 'java',
    title: ls('Java', 'Java', 'Java'),
    description: ls('OOP va backend asoslari.', 'OOP und Backend-Grundlagen.', 'OOP and backend basics.'),
    features: ['code-editor'],
    topics: mkTopics(
      ['Syntax', 'Types', 'Control flow', 'Methods', 'Classes', 'OOP', 'Collections', 'Exceptions', 'Streams', 'Testing', 'Build tools', 'I/O', 'Concurrency', 'Patterns', 'Capstone'],
      ['Syntax', 'Typen', 'Kontrollfluss', 'Methoden', 'Klassen', 'OOP', 'Collections', 'Exceptions', 'Streams', 'Testing', 'Build-Tools', 'I/O', 'Concurrency', 'Patterns', 'Abschlussprojekt'],
      ['Syntax', 'Types', 'Control flow', 'Methods', 'Classes', 'OOP', 'Collections', 'Exceptions', 'Streams', 'Testing', 'Build tools', 'I/O', 'Concurrency', 'Patterns', 'Capstone']
    ),
  },
  {
    id: 'csharp',
    title: ls('C#', 'C#', 'C#'),
    description: ls('.NET asoslari va amaliyot.', '.NET Grundlagen und Praxis.', '.NET fundamentals and practice.'),
    features: ['code-editor'],
    topics: mkTopics(
      ['Syntax', 'Types', 'LINQ', 'Classes', 'OOP', 'Collections', 'Exceptions', 'Async', 'Files', 'Testing', 'Dependency injection', 'EF basics', 'Web API', 'Patterns', 'Capstone'],
      ['Syntax', 'Typen', 'LINQ', 'Klassen', 'OOP', 'Collections', 'Exceptions', 'Async', 'Dateien', 'Testing', 'Dependency Injection', 'EF Basics', 'Web API', 'Patterns', 'Abschlussprojekt'],
      ['Syntax', 'Types', 'LINQ', 'Classes', 'OOP', 'Collections', 'Exceptions', 'Async', 'Files', 'Testing', 'Dependency injection', 'EF basics', 'Web API', 'Patterns', 'Capstone']
    ),
  },
  {
    id: 'c',
    title: ls('C', 'C', 'C'),
    description: ls('Past darajadagi dasturlash.', 'Low-Level Programmierung.', 'Low-level programming.'),
    features: ['code-editor'],
    topics: mkTopics(
      ['Syntax', 'Pointers', 'Memory', 'Arrays', 'Strings', 'Structs', 'Files', 'Debugging', 'Compilation', 'Performance', 'Bit ops', 'Libraries', 'Make', 'Testing', 'Capstone'],
      ['Syntax', 'Pointer', 'Speicher', 'Arrays', 'Strings', 'Structs', 'Dateien', 'Debugging', 'Compilation', 'Performance', 'Bit-Operationen', 'Libraries', 'Make', 'Testing', 'Abschlussprojekt'],
      ['Syntax', 'Pointers', 'Memory', 'Arrays', 'Strings', 'Structs', 'Files', 'Debugging', 'Compilation', 'Performance', 'Bit ops', 'Libraries', 'Make', 'Testing', 'Capstone']
    ),
  },
  {
    id: 'cpp',
    title: ls('C++', 'C++', 'C++'),
    description: ls('OOP, STL va performance.', 'OOP, STL und Performance.', 'OOP, STL, and performance.'),
    features: ['code-editor'],
    topics: mkTopics(
      ['Syntax', 'Classes', 'STL', 'RAII', 'Pointers', 'Templates', 'Move', 'Memory', 'Debugging', 'Build', 'Concurrency', 'Performance', 'Testing', 'Patterns', 'Capstone'],
      ['Syntax', 'Klassen', 'STL', 'RAII', 'Pointer', 'Templates', 'Move', 'Speicher', 'Debugging', 'Build', 'Concurrency', 'Performance', 'Testing', 'Patterns', 'Abschlussprojekt'],
      ['Syntax', 'Classes', 'STL', 'RAII', 'Pointers', 'Templates', 'Move', 'Memory', 'Debugging', 'Build', 'Concurrency', 'Performance', 'Testing', 'Patterns', 'Capstone']
    ),
  },
  {
    id: 'go',
    title: ls('Go', 'Go', 'Go'),
    description: ls('Soddalik va concurrency.', 'Einfachheit und Concurrency.', 'Simplicity and concurrency.'),
    features: ['code-editor'],
    topics: mkTopics(
      ['Syntax', 'Types', 'Functions', 'Structs', 'Interfaces', 'Errors', 'Packages', 'Testing', 'Goroutines', 'Channels', 'HTTP', 'JSON', 'DB basics', 'Debugging', 'Capstone'],
      ['Syntax', 'Typen', 'Funktionen', 'Structs', 'Interfaces', 'Errors', 'Packages', 'Testing', 'Goroutines', 'Channels', 'HTTP', 'JSON', 'DB Basics', 'Debugging', 'Abschlussprojekt'],
      ['Syntax', 'Types', 'Functions', 'Structs', 'Interfaces', 'Errors', 'Packages', 'Testing', 'Goroutines', 'Channels', 'HTTP', 'JSON', 'DB basics', 'Debugging', 'Capstone']
    ),
  },
  {
    id: 'sql',
    title: ls('SQL', 'SQL', 'SQL'),
    description: ls('Relatsion ma’lumotlar bazasi.', 'Relationale Datenbanken.', 'Relational databases.'),
    features: ['code-editor'],
    topics: mkTopics(
      ['SELECT', 'WHERE', 'JOIN', 'GROUP BY', 'Subqueries', 'Indexes', 'Constraints', 'Transactions', 'Normalization', 'Views', 'CTE', 'Functions', 'Performance', 'Modeling', 'Capstone'],
      ['SELECT', 'WHERE', 'JOIN', 'GROUP BY', 'Subqueries', 'Indizes', 'Constraints', 'Transaktionen', 'Normalisierung', 'Views', 'CTE', 'Funktionen', 'Performance', 'Modellierung', 'Abschlussprojekt'],
      ['SELECT', 'WHERE', 'JOIN', 'GROUP BY', 'Subqueries', 'Indexes', 'Constraints', 'Transactions', 'Normalization', 'Views', 'CTE', 'Functions', 'Performance', 'Modeling', 'Capstone']
    ),
  },
  {
    id: 'nosql',
    title: ls('NoSQL', 'NoSQL', 'NoSQL'),
    description: ls('Dokument, key-value va boshqalar.', 'Dokument, Key-Value u.a.', 'Document, key-value, etc.'),
    features: ['code-editor'],
    topics: mkTopics(
      ['Concepts', 'Documents', 'Indexes', 'Aggregation', 'Modeling', 'Consistency', 'Replication', 'Sharding', 'Caching', 'Search', 'Security', 'Backups', 'Monitoring', 'Performance', 'Capstone'],
      ['Konzepte', 'Dokumente', 'Indizes', 'Aggregation', 'Modellierung', 'Konsistenz', 'Replikation', 'Sharding', 'Caching', 'Search', 'Security', 'Backups', 'Monitoring', 'Performance', 'Abschlussprojekt'],
      ['Concepts', 'Documents', 'Indexes', 'Aggregation', 'Modeling', 'Consistency', 'Replication', 'Sharding', 'Caching', 'Search', 'Security', 'Backups', 'Monitoring', 'Performance', 'Capstone']
    ),
  },
];

const codingMetaAll = [...codingCoursesMeta, ...remaining];

function ensure15(arr: string[]): string[] {
  const out = [...arr];
  while (out.length < 15) out.push('Wird ergänzt…');
  return out.slice(0, 15);
}

export function getCodingCourseIds(): CodingCourseId[] {
  return codingMetaAll.map((c) => c.id);
}

export function getCodingCourseMeta(courseId: CodingCourseId): CodingCourseMeta | undefined {
  return codingMetaAll.find((c) => c.id === courseId);
}

export function buildCodingCourse(courseId: CodingCourseId): Course {
  const meta = getCodingCourseMeta(courseId);
  if (!meta) {
    throw new Error(`Unknown coding course: ${courseId}`);
  }

  const uzTopics = ensure15(meta.topics.uz);
  const deTopics = ensure15(meta.topics.de);
  const enTopics = ensure15(meta.topics.en);

  const modules = Array.from({ length: 15 }).map((_, i) => {
    const index = i + 1;
    const id = `m${index}`;
    const prefix = `${courseId}-${id}`;

    // Special handling for TypeScript if available
    let customModuleData = null;
    if (courseId === 'typescript') {
      customModuleData = typescriptModules[i];
    }

    const title = customModuleData
      ? customModuleData.title
      : ls(`Modul ${index}: ${uzTopics[i]}`, `Modul ${index}: ${deTopics[i]}`, `Module ${index}: ${enTopics[i]}`);

    const desc = customModuleData
      ? customModuleData.description
      : ls(
        `${meta.title.uz} — ${uzTopics[i]} bo‘yicha qisqa kirish.`,
        `${meta.title.de} — Kurze Einführung zu ${deTopics[i]}.`,
        `${meta.title.en} — Quick intro to ${enTopics[i]}.`
      );

    const quiz = makeQuiz10({
      prefix,
      basePrompt: ls(
        `${meta.title.uz}: ${uzTopics[i]} — asosiy maqsad nima?`,
        `${meta.title.de}: ${deTopics[i]} — was ist das Kernziel?`,
        `${meta.title.en}: ${enTopics[i]} — what is the core goal?`
      ),
      choices: [
        ls('A: Tushuncha', 'A: Begriff', 'A: Concept'),
        ls('B: Amaliyot', 'B: Praxis', 'B: Practice'),
        ls('C: Xatolar', 'C: Fehler', 'C: Errors'),
        ls('D: Hammasi', 'D: Alles', 'D: All of the above'),
      ],
      correctIndex: 3,
      explanation: ls(
        'Bu modul nazariya + amaliyotni birlashtiradi.',
        'Dieses Modul kombiniert Theorie und Praxis.',
        'This module combines theory and practice.'
      ),
    });

    const homeworks = customModuleData
      ? customModuleData.homeworks.map((hw, hwi) => ({
        id: `${prefix}-hw${hwi + 1}`,
        title: hw.title,
        description: hw.description,
      }))
      : makeHomeworks({ prefix, count: index % 3 === 0 ? 3 : 2 });

    return {
      index,
      id,
      title,
      description: desc,
      sections: [
        { type: 'theory' as const, title: ls('Nazariya', 'Theorie-Erklärung', 'Theory'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
        { type: 'practice' as const, title: ls('Amaliy misollar', 'Praxisbeispiele', 'Practice examples'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
        { type: 'demo' as const, title: ls("Demo", 'Code-/System-Demos', 'Code/system demos'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
        { type: 'video' as const, title: ls('Video', 'Video-Bereich', 'Video area'), content: ls('Video joyi (keyin qo‘shiladi).', 'Video-Platzhalter (wird später ergänzt).', 'Video placeholder (added later).') },
        { type: 'steps' as const, title: ls('Qadam-baqadam', 'Schritt-für-Schritt', 'Step-by-step'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
        { type: 'interactive' as const, title: ls('Interaktiv vazifalar', 'Interaktive Aufgaben', 'Interactive tasks'), content: ls('Tez orada...', 'Wird ergänzt…', 'To be added…') },
      ],
      quizTitle: ls('Quiz (10 savol)', 'Quiz (10 Fragen)', 'Quiz (10 questions)'),
      quiz,
      homeworks,
      materials: makeMaterials({ prefix, count: 2 }),
    };
  });

  return {
    group: 'coding',
    id: meta.id,
    title: meta.title,
    description: meta.description,
    features: meta.features,
    modules,
    minScoreToUnlockNext: 7,
  };
}
