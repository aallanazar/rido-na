import type { LocalizedString } from '@/lib/curriculum/types';
import type { Course, CodingCourseId, CourseFeature, CourseModule } from './types';
import { ls, makeHomeworks, makeMaterials, makeQuiz10 } from './helpers';
import { pythonDeepContent } from './content/python';

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
      ['Tiplar', 'Interfeyslar', 'Generiklar', 'Union/Intersection', 'Enum & Literal', 'Narrowing', 'Funksiyalar', 'Classlar', 'Type Guards', 'Utility Types', 'TS config', 'Async typing', 'React typing', 'Patterns', 'Final loyiha'],
      ['Typen', 'Interfaces', 'Generics', 'Union/Intersection', 'Enums & Literals', 'Narrowing', 'Funktionen', 'Classes', 'Type Guards', 'Utility Types', 'TS-Config', 'Async-Typing', 'React-Typing', 'Patterns', 'Abschlussprojekt'],
      ['Types', 'Interfaces', 'Generics', 'Union/Intersection', 'Enums & literals', 'Narrowing', 'Functions', 'Classes', 'Type guards', 'Utility types', 'TS config', 'Async typing', 'React typing', 'Patterns', 'Capstone project']
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
    id: 'typst',
    title: ls('Typst', 'Typst', 'Typst'),
    description: ls('Typst orqali professional hujjat va layout yaratish.', 'Professionelle Dokumente und Layouts mit Typst erstellen.', 'Create professional documents and layouts with Typst.'),
    features: ['code-editor', 'live-preview'],
    topics: mkTopics(
      ['Typst kirish', 'Sintaksis asoslari', 'Sarlavha va matn', 'Ro‘yxat va jadval', 'Sahifa sozlamalari', 'Shablonlar', 'Uslub tizimi', 'Formulalar', 'Rasm va diagramma', 'Avtomatik havolalar', 'Bibliografiya', 'Makrolar', 'Ishchi loyiha', 'Nashrga tayyorlash', 'Imtihon tayyorgarligi'],
      ['Einführung in Typst', 'Syntax-Grundlagen', 'Überschriften und Text', 'Listen und Tabellen', 'Seiteneinstellungen', 'Vorlagen', 'Styling-System', 'Formeln', 'Bilder und Diagramme', 'Automatische Verweise', 'Bibliografie', 'Makros', 'Arbeitsprojekt', 'Publikationsvorbereitung', 'Prüfungsvorbereitung'],
      ['Typst introduction', 'Syntax fundamentals', 'Headings and text', 'Lists and tables', 'Page settings', 'Templates', 'Styling system', 'Formulas', 'Images and diagrams', 'Automatic references', 'Bibliography', 'Macros', 'Working project', 'Publication prep', 'Exam preparation']
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

type TypstLessonPlan = {
  topic: string;
  theory: string;
  practice: string;
  demo: string;
  video: string;
  steps: string;
  interactive: string;
  materials: [string, string];
  homeworks: [string, string];
};

const typstLessons: TypstLessonPlan[] = [
  {
    topic: 'Typst Setup und erstes Dokument',
    theory: 'Installation, Dateistruktur und Render-Workflow. Du lernst den Unterschied zu klassischen WYSIWYG-Editoren.',
    practice: 'Erstelle ein Dokument mit Titel, Autor und Datum. Richte eine saubere Projektstruktur ein.',
    demo: 'Live-Demo: `.typ` Datei erstellen, kompilieren und Output prüfen.',
    video: 'Video: Projektstart und Tooling-Überblick (Editor + Preview).',
    steps: '1) Projektordner anlegen 2) main.typ erstellen 3) Titelblock setzen 4) PDF prüfen.',
    interactive: 'Fülle fehlende Felder im Starttemplate aus und exportiere ein korrektes PDF.',
    materials: ['Startertemplate', 'Installationsleitfaden'],
    homeworks: ['Dokument-Setup wiederholen', 'Eigenes Titelblatt bauen'],
  },
  {
    topic: 'Typst Syntax und Struktur',
    theory: 'Textblöcke, Inline-Elemente, Kommentare und saubere Strukturierung großer Dateien.',
    practice: 'Schreibe eine strukturierte Kursnotiz mit Absätzen, Hervorhebungen und Zitaten.',
    demo: 'Vergleich: unstrukturierter vs. strukturierter Typst-Code.',
    video: 'Video: Syntax-Muster für lesbaren Code.',
    steps: '1) Abschnitte planen 2) Syntax anwenden 3) Lesbarkeit optimieren 4) Ergebnis vergleichen.',
    interactive: 'Ordne gemischte Syntaxbausteine korrekt einem Dokumentteil zu.',
    materials: ['Syntax-Cheat-Sheet', 'Beispieldokument Struktur'],
    homeworks: ['Notizblatt in Typst schreiben', 'Codeformat nach Styleguide überarbeiten'],
  },
  {
    topic: 'Überschriften, Textfluss und Semantik',
    theory: 'Hierarchieebenen, semantische Auszeichnung und konsistenter Textfluss.',
    practice: 'Baue ein 3-seitiges Handout mit sauberer Kapitelstruktur.',
    demo: 'Auto-Nummerierung und Sprungmarken für Überschriften.',
    video: 'Video: Gute Semantik in Lernunterlagen.',
    steps: '1) Outline definieren 2) Überschriften setzen 3) Absatzlogik verbessern 4) Review.',
    interactive: 'Korrigiere eine falsche Heading-Hierarchie in einem fehlerhaften Dokument.',
    materials: ['Handout-Vorlage', 'Semantik-Checkliste'],
    homeworks: ['Kapitelstruktur für ein Tutorial bauen', 'Textfluss mit Zwischenüberschriften optimieren'],
  },
  {
    topic: 'Listen, Tabellen und Datenpräsentation',
    theory: 'Nummerierte Listen, verschachtelte Listen und tabellarische Darstellung von Lerninhalten.',
    practice: 'Erstelle eine Vergleichstabelle und eine To-do-Liste für ein Lernprojekt.',
    demo: 'Tabellenstil variieren: kompakt, ausführlich, prüfungsorientiert.',
    video: 'Video: Tabellen sauber und verständlich aufbauen.',
    steps: '1) Daten sammeln 2) Tabelle aufbauen 3) Listen ergänzen 4) Lesbarkeit testen.',
    interactive: 'Wandle Rohdaten in eine strukturierte Lern-Tabelle um.',
    materials: ['Tabellen-Pattern', 'Listen-Pattern'],
    homeworks: ['Vergleichstabelle erstellen', 'Lernplan als verschachtelte Liste schreiben'],
  },
  {
    topic: 'Seitenlayout und Dokumentdesign',
    theory: 'Ränder, Spalten, Seitenzahlen und visuelle Balance für professionelle Dokumente.',
    practice: 'Gestalte ein 2-seitiges Factsheet mit konsistentem Layout.',
    demo: 'Unterschiedliche Seitenformate und deren Wirkung.',
    video: 'Video: Layout-Regeln für sauberen Satz.',
    steps: '1) Seitenformat wählen 2) Margins definieren 3) Kopf/Fuß einrichten 4) Ausgabe prüfen.',
    interactive: 'Behebe Layoutfehler in einem vorgegebenen Faktenblatt.',
    materials: ['Layout-Checkliste', 'Factsheet-Beispiel'],
    homeworks: ['Eigenes Factsheet layouten', 'Kopf-/Fußzeile standardisieren'],
  },
  {
    topic: 'Vorlagen und Wiederverwendbarkeit',
    theory: 'Template-Denken: einmal definieren, mehrfach konsistent nutzen.',
    practice: 'Baue eine Vorlage für Arbeitsblätter mit festem Aufbau.',
    demo: 'Template erweitern um optionale Abschnitte.',
    video: 'Video: Von Einzeldatei zur skalierbaren Vorlage.',
    steps: '1) Basislayout extrahieren 2) Parameter planen 3) Beispielinstanzen erzeugen 4) testen.',
    interactive: 'Wähle passende Template-Parameter für drei Dokumenttypen.',
    materials: ['Arbeitsblatt-Template', 'Template-Parameter Leitfaden'],
    homeworks: ['Template für Übungsblätter bauen', 'Template mit zwei Varianten liefern'],
  },
  {
    topic: 'Styling-System und Design Tokens',
    theory: 'Farben, Abstände, Schriftgrößen als wiederverwendbares Designsystem.',
    practice: 'Definiere ein kleines Style-System für Unterrichtsmaterialien.',
    demo: 'Vorher/Nachher: inkonsistentes vs. token-basiertes Styling.',
    video: 'Video: Stilregeln zentral verwalten.',
    steps: '1) Tokenliste erstellen 2) Komponenten stylen 3) Konsistenz prüfen 4) refactor.',
    interactive: 'Ordne Stilregeln den richtigen Token-Kategorien zu.',
    materials: ['Design-Token Vorlage', 'Styleguide Mini'],
    homeworks: ['Token-basiertes Styling anwenden', 'Farbsystem dokumentieren'],
  },
  {
    topic: 'Mathematische Formeln mit Typst',
    theory: 'Inline- und Block-Formeln, Lesbarkeit mathematischer Notation und Struktur.',
    practice: 'Setze ein Formelblatt für Algebra und Statistik.',
    demo: 'Komplexe Formeln Schritt für Schritt aufbauen.',
    video: 'Video: Formelblätter für Unterricht und Prüfung.',
    steps: '1) Formeltypen sammeln 2) korrekt setzen 3) formatieren 4) gegenprüfen.',
    interactive: 'Repariere fehlerhafte Formelsyntax in Beispielaufgaben.',
    materials: ['Formel-Referenz', 'Algebra-Formelblatt'],
    homeworks: ['10 Formeln korrekt setzen', 'Mini-Formelsammlung erstellen'],
  },
  {
    topic: 'Bilder, Grafiken und Captions',
    theory: 'Bildintegration, Bildunterschriften, Positionierung und visuelle Klarheit.',
    practice: 'Baue eine bebilderte Lernseite mit drei erklärenden Grafiken.',
    demo: 'Gute und schlechte Bildplatzierung im Vergleich.',
    video: 'Video: Medien in Typst effektiv einsetzen.',
    steps: '1) Bilder auswählen 2) Caption schreiben 3) Größen anpassen 4) Export prüfen.',
    interactive: 'Wähle für jeden Inhalt die passende Bildplatzierung.',
    materials: ['Bildrichtlinien', 'Caption-Beispiele'],
    homeworks: ['Bilder in Lernblatt integrieren', 'Caption-Qualität verbessern'],
  },
  {
    topic: 'Verweise, Inhaltsverzeichnis und Navigation',
    theory: 'Interne Referenzen, Querverweise und automatische Navigationsstrukturen.',
    practice: 'Erstelle ein Dokument mit klickbarem Inhaltsverzeichnis und Referenzen.',
    demo: 'Automatische Aktualisierung bei Strukturänderungen.',
    video: 'Video: Navigierbare Dokumente aufbauen.',
    steps: '1) Marker setzen 2) TOC erzeugen 3) Querverweise testen 4) PDF-Navigation prüfen.',
    interactive: 'Ergänze fehlende Referenzen in einem längeren Dokument.',
    materials: ['TOC-Template', 'Referenzmuster'],
    homeworks: ['Dokument mit TOC erstellen', 'Querverweise in Bericht einbauen'],
  },
  {
    topic: 'Quellenangaben und Bibliografie',
    theory: 'Zitierstil, Literaturverwaltung und konsistente Quellenangaben.',
    practice: 'Verfasse eine Mini-Ausarbeitung mit mindestens 5 Quellen.',
    demo: 'Zitierfehler erkennen und beheben.',
    video: 'Video: Bibliografie-Workflow von A bis Z.',
    steps: '1) Quellen sammeln 2) Stil wählen 3) Zitate einbauen 4) Bibliografie generieren.',
    interactive: 'Ordne Quellen den richtigen Zitationsformen zu.',
    materials: ['Zitierstil-Karte', 'Bibliografie-Beispieldatei'],
    homeworks: ['Quellenliste erstellen', 'Text mit In-Text-Zitaten ergänzen'],
  },
  {
    topic: 'Makros und Automatisierung',
    theory: 'Wiederkehrende Muster als Makros kapseln und Wartbarkeit erhöhen.',
    practice: 'Erstelle Makros für Hinweisbox, Warnung und Aufgabenblock.',
    demo: 'Makro-Refactoring in einem größeren Dokument.',
    video: 'Video: Produktive Typst-Automatisierung.',
    steps: '1) Wiederholungen identifizieren 2) Makro definieren 3) ersetzen 4) validieren.',
    interactive: 'Verwandle redundanten Code in ein parametrisierbares Makro.',
    materials: ['Makro-Rezeptbuch', 'Automationsbeispiele'],
    homeworks: ['2 eigene Makros entwickeln', 'Bestandsdokument auf Makros migrieren'],
  },
  {
    topic: 'Arbeitsprojekt: Unterrichtsskript',
    theory: 'Projektplanung, Scope-Definition und modulare Dokumentstruktur.',
    practice: 'Beginne ein vollständiges Unterrichtsskript mit mehreren Kapiteln.',
    demo: 'Projektstruktur für kollaboratives Arbeiten.',
    video: 'Video: Von Lernmodulen zum Gesamtprojekt.',
    steps: '1) Gliederung 2) Kapiteldateien 3) Layout integrieren 4) Meilensteine planen.',
    interactive: 'Ordne Aufgabenpakete den richtigen Projektphasen zu.',
    materials: ['Projektstruktur-Vorlage', 'Meilenstein-Board'],
    homeworks: ['Skriptentwurf starten', 'Kapitel-Template für Teamarbeit vorbereiten'],
  },
  {
    topic: 'Publikation, Export und Qualitätskontrolle',
    theory: 'Finale Prüfung von Layout, Konsistenz, Lesbarkeit und Exportoptionen.',
    practice: 'Erstelle eine veröffentlichungsreife PDF-Version deines Skripts.',
    demo: 'Qualitätskontrolle mit klarer Checkliste.',
    video: 'Video: Publikations-Workflow in der Praxis.',
    steps: '1) QA-Checkliste abarbeiten 2) Fehler beheben 3) Export erstellen 4) Endreview.',
    interactive: 'Finde und korrigiere 10 typische Publikationsfehler.',
    materials: ['QA-Checkliste', 'Export-Leitfaden'],
    homeworks: ['Finales PDF liefern', 'Qualitätsbericht schreiben'],
  },
  {
    topic: 'Prüfungsvorbereitung und Mock Assessment',
    theory: 'Wiederholung zentraler Konzepte, typische Aufgabenformen und Zeitmanagement.',
    practice: 'Bearbeite ein vollständiges Mock-Assessment unter Zeitvorgabe.',
    demo: 'Lösungsweg und Bewertungsraster.',
    video: 'Video: Strategien für die Abschlussleistung.',
    steps: '1) Themen wiederholen 2) Probeaufgabe lösen 3) Fehleranalyse 4) Lernplan finalisieren.',
    interactive: 'Simuliere eine Prüfungsabgabe mit Self-Check.',
    materials: ['Mock-Assessment', 'Bewertungsraster'],
    homeworks: ['Probeprüfung abgeben', 'Persönlichen Wiederholungsplan erstellen'],
  },
];

function buildTypstModules(): CourseModule[] {
  const learningModules = typstLessons.map((lesson, i) => {
    const index = i + 1;
    const id = `m${index}`;
    const prefix = `typst-${id}`;

    return {
      index,
      id,
      title: ls(`Modul ${index}: ${lesson.topic}`, `Modul ${index}: ${lesson.topic}`, `Module ${index}: ${lesson.topic}`),
      description: ls(
        `Dieses Modul behandelt: ${lesson.topic}.`,
        `Dieses Modul behandelt: ${lesson.topic}.`,
        `This module covers: ${lesson.topic}.`
      ),
      sections: [
        { type: 'theory' as const, title: ls('Nazariya', 'Theorie', 'Theory'), content: ls(lesson.theory, lesson.theory, lesson.theory) },
        { type: 'practice' as const, title: ls('Amaliyot', 'Praxis', 'Practice'), content: ls(lesson.practice, lesson.practice, lesson.practice) },
        { type: 'demo' as const, title: ls('Demo', 'Demo', 'Demo'), content: ls(lesson.demo, lesson.demo, lesson.demo) },
        { type: 'video' as const, title: ls('Video', 'Video', 'Video'), content: ls(lesson.video, lesson.video, lesson.video) },
        { type: 'steps' as const, title: ls('Qadam-baqadam', 'Schritt-für-Schritt', 'Step-by-step'), content: ls(lesson.steps, lesson.steps, lesson.steps) },
        { type: 'interactive' as const, title: ls('Interaktiv', 'Interaktive Aufgabe', 'Interactive task'), content: ls(lesson.interactive, lesson.interactive, lesson.interactive) },
      ],
      quizTitle: ls('Quiz (10 savol)', 'Quiz (10 Fragen)', 'Quiz (10 questions)'),
      quiz: makeQuiz10({
        prefix,
        basePrompt: ls(
          `${lesson.topic}: asosiy maqsad nima?`,
          `${lesson.topic}: was ist das Kernziel?`,
          `${lesson.topic}: what is the core goal?`
        ),
        choices: [
          ls('A: Struktur', 'A: Struktur', 'A: Structure'),
          ls('B: Amaliyot', 'B: Praxis', 'B: Practice'),
          ls('C: Sifat', 'C: Qualität', 'C: Quality'),
          ls('D: Hammasi', 'D: Alles zusammen', 'D: All of the above'),
        ],
        correctIndex: 3,
        explanation: ls('Modul nazariya va amaliyotni birlashtiradi.', 'Das Modul verbindet Theorie und Praxis.', 'This module combines theory and practice.'),
      }),
      homeworks: [
        {
          id: `${prefix}-hw1`,
          title: ls('Uy vazifasi 1', 'Hausaufgabe 1', 'Homework 1'),
          description: ls(lesson.homeworks[0], lesson.homeworks[0], lesson.homeworks[0]),
        },
        {
          id: `${prefix}-hw2`,
          title: ls('Uy vazifasi 2', 'Hausaufgabe 2', 'Homework 2'),
          description: ls(lesson.homeworks[1], lesson.homeworks[1], lesson.homeworks[1]),
        },
      ],
      materials: [
        {
          id: `${prefix}-mat1`,
          title: ls(lesson.materials[0], lesson.materials[0], lesson.materials[0]),
          description: ls('Passendes Lernmaterial zum Modul.', 'Passendes Lernmaterial zum Modul.', 'Relevant study material for the module.'),
        },
        {
          id: `${prefix}-mat2`,
          title: ls(lesson.materials[1], lesson.materials[1], lesson.materials[1]),
          description: ls('Ergänzendes Material mit Übungen.', 'Ergänzendes Material mit Übungen.', 'Supplemental material with exercises.'),
        },
      ],
    };
  });

  const finalModule: CourseModule = {
    index: 16,
    id: 'm16',
    title: ls('Modul 16: Projektarbeit der Name', 'Modul 16: Projektarbeit der Name', 'Module 16: Projektarbeit der Name'),
    description: ls(
      'Abschlussmodul mit drei realen Typst-Projekten.',
      'Abschlussmodul mit drei realen Typst-Projekten.',
      'Final module with three real Typst projects.'
    ),
    sections: [
      {
        type: 'theory',
        title: ls('Nazariya', 'Projektbriefing', 'Project briefing'),
        content: ls(
          'Loyihaning maqsadi: dizayn, tarkib va eksport sifatini yakuniy baholash.',
          'Ziel: Deine Typst-Kompetenz in Konzeption, Umsetzung und finalem Export nachweisen.',
          'Goal: demonstrate Typst competency in planning, implementation, and final export quality.'
        ),
      },
      {
        type: 'practice',
        title: ls('Amaliyot', 'Drei Projekte', 'Three projects'),
        content: ls(
          '1) Lehrskript (8–12 Seiten)\n2) Wissenschaftlicher Kurzbericht mit Quellen\n3) Portfolio-Dokument mit eigener Vorlage',
          '1) Lehrskript (8–12 Seiten)\n2) Wissenschaftlicher Kurzbericht mit Quellen\n3) Portfolio-Dokument mit eigener Vorlage',
          '1) Teaching script (8–12 pages)\n2) Scientific short report with references\n3) Portfolio document with custom template'
        ),
      },
      {
        type: 'demo',
        title: ls('Demo', 'Bewertungsdemo', 'Evaluation demo'),
        content: ls(
          'Baholash mezonlari: strukturaviy aniqlik, typografiya, qayta foydalanish va xatolarsiz export.',
          'Bewertungskriterien: Struktur, Typografie, Wiederverwendbarkeit und fehlerfreier Export.',
          'Rubric: structure, typography, reusability, and error-free export.'
        ),
      },
      {
        type: 'video',
        title: ls('Video', 'Abgabe-Workflow', 'Submission workflow'),
        content: ls(
          'Video: loyihani paketlash, tekshirish va topshirish jarayoni.',
          'Video: Workflow für Paketierung, Qualitätscheck und Abgabe.',
          'Video: packaging, quality check, and submission workflow.'
        ),
      },
      {
        type: 'steps',
        title: ls('Qadam-baqadam', 'Schrittfolge', 'Step flow'),
        content: ls(
          '1) Projekt auswählen\n2) Meilensteine planen\n3) Umsetzung\n4) QA\n5) Endabgabe',
          '1) Projekt wählen\n2) Meilensteine planen\n3) Umsetzen\n4) QA\n5) Endabgabe',
          '1) Select project\n2) Plan milestones\n3) Implement\n4) QA\n5) Final submission'
        ),
      },
      {
        type: 'interactive',
        title: ls('Interaktiv', 'Projekt-Check', 'Project check'),
        content: ls(
          'Self-Check: barcha mezonlar bajarilganini belgilab chiqing.',
          'Self-Check: Prüfe jede Rubrik vor der finalen Abgabe.',
          'Self-check: validate every rubric item before final submission.'
        ),
      },
    ],
    quizTitle: ls('Projekt-Quiz (10 savol)', 'Projekt-Quiz (10 Fragen)', 'Project quiz (10 questions)'),
    quiz: makeQuiz10({
      prefix: 'typst-m16',
      basePrompt: ls(
        'Projektarbeit: eng muhim yakuniy qadam qaysi?',
        'Projektarbeit: welcher finale Schritt ist unverzichtbar?',
        'Project work: which final step is essential?'
      ),
      choices: [
        ls('A: Planung', 'A: Planung', 'A: Planning'),
        ls('B: QA', 'B: QA', 'B: QA'),
        ls('C: Export', 'C: Export', 'C: Export'),
        ls('D: Hammasi', 'D: Alles zusammen', 'D: All of the above'),
      ],
      correctIndex: 3,
      explanation: ls('Loyiha muvaffaqiyati barcha bosqichlarning sifatiga bog‘liq.', 'Ein starkes Projekt braucht Planung, Qualitätssicherung und sauberen Export.', 'A strong project requires planning, QA, and clean export.'),
    }),
    homeworks: [
      {
        id: 'typst-m16-hw1',
        title: ls('Loyiha 1 topshirish', 'Projekt 1 Abgabe', 'Project 1 submission'),
        description: ls('Lehrskript vollständig abgeben.', 'Lehrskript vollständig abgeben.', 'Submit complete teaching script.'),
      },
      {
        id: 'typst-m16-hw2',
        title: ls('Loyiha 2 topshirish', 'Projekt 2 Abgabe', 'Project 2 submission'),
        description: ls('Wissenschaftlichen Kurzbericht mit Quellen abgeben.', 'Wissenschaftlichen Kurzbericht mit Quellen abgeben.', 'Submit scientific short report with references.'),
      },
      {
        id: 'typst-m16-hw3',
        title: ls('Loyiha 3 topshirish', 'Projekt 3 Abgabe', 'Project 3 submission'),
        description: ls('Portfolio-Dokument inklusive eigener Vorlage abgeben.', 'Portfolio-Dokument inklusive eigener Vorlage abgeben.', 'Submit portfolio document including custom template.'),
      },
    ],
    materials: [
      {
        id: 'typst-m16-mat1',
        title: ls('Projektbrief 1', 'Projektbrief 1: Lehrskript', 'Project brief 1: Teaching script'),
        description: ls('Anforderungen und Bewertungsraster.', 'Anforderungen und Bewertungsraster.', 'Requirements and grading rubric.'),
      },
      {
        id: 'typst-m16-mat2',
        title: ls('Projektbrief 2', 'Projektbrief 2: Wissenschaftlicher Bericht', 'Project brief 2: Scientific report'),
        description: ls('Quellenarbeit, Struktur und Qualitätskriterien.', 'Quellenarbeit, Struktur und Qualitätskriterien.', 'References, structure, and quality criteria.'),
      },
      {
        id: 'typst-m16-mat3',
        title: ls('Projektbrief 3', 'Projektbrief 3: Portfolio', 'Project brief 3: Portfolio'),
        description: ls('Template-Qualität und finale Abgabeanforderungen.', 'Template-Qualität und finale Abgabeanforderungen.', 'Template quality and final submission requirements.'),
      },
    ],
  };

  return [...learningModules, finalModule];
}

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

  if (courseId === 'typst') {
    return {
      group: 'coding',
      id: meta.id,
      title: meta.title,
      description: meta.description,
      features: meta.features,
      modules: buildTypstModules(),
      minScoreToUnlockNext: 7,
    };
  }

  const uzTopics = ensure15(meta.topics.uz);
  const deTopics = ensure15(meta.topics.de);
  const enTopics = ensure15(meta.topics.en);

  const modules = Array.from({ length: 15 }).map((_, i) => {
    const index = i + 1;
    const id = `m${index}`;
    const title = ls(`Modul ${index}: ${uzTopics[i]}`, `Modul ${index}: ${deTopics[i]}`, `Module ${index}: ${enTopics[i]}`);

    const prefix = `${courseId}-${id}`;

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

    // Deep content for Python modules 1-3
    const deepModule = courseId === 'python' ? pythonDeepContent.find(d => d.moduleIndex === index) : undefined;

    const deepSections = deepModule ? [
      { type: 'theory' as const, title: ls('Nazariya — Dars 1', 'Theorie — Lektion 1', 'Theory — Lesson 1'), content: deepModule.lessons[0].theory },
      { type: 'practice' as const, title: ls('Amaliyot — Dars 1', 'Praxis — Lektion 1', 'Practice — Lesson 1'), content: deepModule.lessons[0].practice },
      { type: 'steps' as const, title: ls('Qadam-baqadam — Dars 1', 'Schritt-für-Schritt — Lektion 1', 'Step-by-step — Lesson 1'), content: deepModule.lessons[0].steps },
      { type: 'theory' as const, title: ls('Nazariya — Dars 2', 'Theorie — Lektion 2', 'Theory — Lesson 2'), content: deepModule.lessons[1].theory },
      { type: 'practice' as const, title: ls('Amaliyot — Dars 2', 'Praxis — Lektion 2', 'Practice — Lesson 2'), content: deepModule.lessons[1].practice },
      { type: 'steps' as const, title: ls('Qadam-baqadam — Dars 2', 'Schritt-für-Schritt — Lektion 2', 'Step-by-step — Lesson 2'), content: deepModule.lessons[1].steps },
    ] : null;

    const genericSections = [
      {
        type: 'theory' as const, title: ls('Nazariya', 'Theorie-Erklärung', 'Theory'), content: ls(
          `${meta.title.uz} — ${uzTopics[i]}: Bu bo'limda asosiy tushunchalar, ta'riflar va qoidalar batafsil tushuntiriladi. Har bir yangi tushuncha oddiy misollar bilan mustahkamlanadi. Maqsad — mavzuning nazariy asoslarini puxta o'rganish.`,
          `${meta.title.de} — ${deTopics[i]}: In diesem Abschnitt werden die grundlegenden Konzepte, Definitionen und Regeln ausführlich erklärt. Jedes neue Konzept wird mit einfachen Beispielen gefestigt. Ziel: solides Verständnis der theoretischen Grundlagen.`,
          `${meta.title.en} — ${enTopics[i]}: This section explains the core concepts, definitions, and rules in detail. Each new concept is reinforced with simple examples. Goal: solid understanding of the theoretical foundations.`
        )
      },
      {
        type: 'practice' as const, title: ls('Amaliy misollar', 'Praxisbeispiele', 'Practice examples'), content: ls(
          `Quyidagi amaliy misollarni o'rganing:\n1) ${uzTopics[i]} bo'yicha oddiy misol — boshlang'ich daraja.\n2) ${uzTopics[i]} — o'rta daraja, real loyihada qo'llash.\n3) ${uzTopics[i]} — murakkabroq misol, xatolarni bartaraf etish bilan.\nHar bir misolni o'zingiz yozib ko'ring.`,
          `Arbeiten Sie folgende Praxisbeispiele durch:\n1) ${deTopics[i]} — einfaches Beispiel, Einstiegsniveau.\n2) ${deTopics[i]} — mittleres Niveau, Anwendung in realen Projekten.\n3) ${deTopics[i]} — komplexeres Beispiel mit Fehlerbehandlung.\nSchreiben Sie jedes Beispiel selbst.`,
          `Work through the following practice examples:\n1) ${enTopics[i]} — simple example, beginner level.\n2) ${enTopics[i]} — intermediate level, applied in real projects.\n3) ${enTopics[i]} — more complex example with error handling.\nWrite each example yourself.`
        )
      },
      {
        type: 'demo' as const, title: ls("Demo", 'Code-/System-Demos', 'Code/system demos'), content: ls(
          `Live demo: ${uzTopics[i]} mavzusida ishchi kod yozamiz. Har bir qadam izohlanadi. Natijani konsolda yoki brauzerda ko'ramiz.`,
          `Live-Demo: Wir schreiben funktionierenden Code zum Thema ${deTopics[i]}. Jeder Schritt wird kommentiert. Das Ergebnis wird in der Konsole oder im Browser angezeigt.`,
          `Live demo: We write working code on the topic of ${enTopics[i]}. Each step is commented. The result is shown in the console or browser.`
        )
      },
      {
        type: 'video' as const, title: ls('Video', 'Video-Bereich', 'Video area'), content: ls(
          `Video darslik: ${meta.title.uz} — ${uzTopics[i]}. Darsda nazariya va amaliyot birlashtirilgan. Davomiyligi: taxminan 15-20 daqiqa.`,
          `Video-Lektion: ${meta.title.de} — ${deTopics[i]}. Theorie und Praxis werden kombiniert. Dauer: ca. 15–20 Minuten.`,
          `Video lesson: ${meta.title.en} — ${enTopics[i]}. Theory and practice are combined. Duration: approximately 15–20 minutes.`
        )
      },
      {
        type: 'steps' as const, title: ls('Qadam-baqadam', 'Schritt-für-Schritt', 'Step-by-step'), content: ls(
          `1) Muhitni tayyorlang va loyihani oching.\n2) ${uzTopics[i]} bo'yicha asosiy kodni yozing.\n3) Kodni ishga tushiring va natijani tekshiring.\n4) Xatolarni toping va tuzating.\n5) Kodni optimallashtiring va yakuniy versiyani saqlang.`,
          `1) Entwicklungsumgebung vorbereiten und Projekt öffnen.\n2) Grundlegenden Code zum Thema ${deTopics[i]} schreiben.\n3) Code ausführen und Ergebnis prüfen.\n4) Fehler finden und beheben.\n5) Code optimieren und finale Version speichern.`,
          `1) Prepare your environment and open the project.\n2) Write the basic code for ${enTopics[i]}.\n3) Run the code and check the result.\n4) Find and fix errors.\n5) Optimize the code and save the final version.`
        )
      },
      {
        type: 'interactive' as const, title: ls('Interaktiv vazifalar', 'Interaktive Aufgaben', 'Interactive tasks'), content: ls(
          `Interaktiv mashq: ${uzTopics[i]} bo'yicha berilgan kodni to'ldiring yoki xatolarni toping. Maqsad — mustaqil kodlash ko'nikmasini rivojlantirish.`,
          `Interaktive Übung: Vervollständigen Sie den gegebenen Code zum Thema ${deTopics[i]} oder finden Sie die Fehler. Ziel: eigenständige Programmierfähigkeiten entwickeln.`,
          `Interactive exercise: Complete the given code on ${enTopics[i]} or find the errors. Goal: develop independent coding skills.`
        )
      },
    ];

    return {
      index,
      id,
      title,
      description: ls(
        `${meta.title.uz} — ${uzTopics[i]} bo'yicha qisqa kirish.`,
        `${meta.title.de} — Kurze Einführung zu ${deTopics[i]}.`,
        `${meta.title.en} — Quick intro to ${enTopics[i]}.`
      ),
      sections: deepSections ?? genericSections,
      quizTitle: ls('Quiz (10 savol)', 'Quiz (10 Fragen)', 'Quiz (10 questions)'),
      quiz,
      homeworks: [
        {
          id: `${prefix}-hw1`,
          title: ls(`Uy vazifasi 1: ${uzTopics[i]}`, `Hausaufgabe 1: ${deTopics[i]}`, `Homework 1: ${enTopics[i]}`),
          description: ls(
            `${uzTopics[i]} mavzusi bo'yicha mustaqil loyiha yozing. Barcha asosiy tushunchalarni qo'llang.`,
            `Schreiben Sie ein eigenständiges Projekt zum Thema ${deTopics[i]}. Wenden Sie alle Kernkonzepte an.`,
            `Write an independent project on ${enTopics[i]}. Apply all core concepts.`
          ),
        },
        {
          id: `${prefix}-hw2`,
          title: ls(`Uy vazifasi 2: ${uzTopics[i]} amaliyot`, `Hausaufgabe 2: ${deTopics[i]} Praxis`, `Homework 2: ${enTopics[i]} practice`),
          description: ls(
            `${uzTopics[i]} bo'yicha 3 ta mashq bajaring va yechimlarni hujjatlang.`,
            `Lösen Sie 3 Übungen zu ${deTopics[i]} und dokumentieren Sie Ihre Lösungen.`,
            `Complete 3 exercises on ${enTopics[i]} and document your solutions.`
          ),
        },
        ...(index % 3 === 0 ? [{
          id: `${prefix}-hw3`,
          title: ls(`Uy vazifasi 3: ${uzTopics[i]} tahlil`, `Hausaufgabe 3: ${deTopics[i]} Analyse`, `Homework 3: ${enTopics[i]} analysis`),
          description: ls(
            `${uzTopics[i]} mavzusida mavjud kodni tahlil qiling va yaxshilash takliflarini yozing.`,
            `Analysieren Sie bestehenden Code zum Thema ${deTopics[i]} und schlagen Sie Verbesserungen vor.`,
            `Analyze existing code on ${enTopics[i]} and write improvement suggestions.`
          ),
        }] : []),
      ],
      materials: [
        {
          id: `${prefix}-mat1`,
          title: ls(`${uzTopics[i]} — Qo'llanma`, `${deTopics[i]} — Leitfaden`, `${enTopics[i]} — Guide`),
          description: ls(
            `${meta.title.uz}: ${uzTopics[i]} bo'yicha to'liq qo'llanma va ma'lumotnoma.`,
            `${meta.title.de}: Vollständiger Leitfaden und Referenz zu ${deTopics[i]}.`,
            `${meta.title.en}: Complete guide and reference for ${enTopics[i]}.`
          ),
        },
        {
          id: `${prefix}-mat2`,
          title: ls(`${uzTopics[i]} — Mashqlar to'plami`, `${deTopics[i]} — Aufgabensammlung`, `${enTopics[i]} — Exercise collection`),
          description: ls(
            `${uzTopics[i]} bo'yicha qo'shimcha mashqlar va yechimlar.`,
            `Ergänzende Übungen und Lösungen zu ${deTopics[i]}.`,
            `Additional exercises and solutions for ${enTopics[i]}.`
          ),
        },
      ],
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
