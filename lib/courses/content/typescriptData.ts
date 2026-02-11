import { ls } from '../helpers';
import type { LocalizedString } from '@/lib/curriculum/types';

export type HomeworkData = {
    title: LocalizedString;
    description: LocalizedString;
};

export type ModuleData = {
    title: LocalizedString;
    description: LocalizedString;
    homeworks: HomeworkData[];
};

export const typescriptModules: ModuleData[] = [
    // 1. Einführung & Grundlagen
    {
        title: ls('Kirish va Asoslar', 'Einführung & Grundlagen', 'Introduction & Basics'),
        description: ls(
            'TypeScript vs JavaScript, tsc, tiplar (string, number, boolean), any, unknown',
            'TypeScript vs JavaScript, tsc, Typen (string, number, boolean), any, unknown',
            'TypeScript vs JavaScript, tsc, types (string, number, boolean), any, unknown'
        ),
        homeworks: [
            {
                title: ls('greet() funksiyasi', 'Funktion greet()', 'Function greet()'),
                description: ls(
                    'greet(name: string): string funksiyasini yarating, u "Hello, ${name}!" qaytarishi kerak. Uni any va unknown bilan sinab ko‘ring.',
                    'Erstelle eine Funktion greet(name: string): string, die "Hello, ${name}!" zurückgibt. Teste sie mit any und unknown als Eingabe – was passiert?',
                    'Create a function greet(name: string): string that returns "Hello, ${name}!". Test it with any and unknown inputs – what happens?'
                ),
            },
            {
                title: ls('Age o‘zgaruvchisi', 'Variable age', 'Variable age'),
                description: ls(
                    'age o‘zgaruvchisini number tipi bilan e’lon qiling va 25 ga tenglang. Unga string qiymat berib ko‘ring.',
                    'Schreibe eine Variable age mit Typ number, initialisiere sie mit 25. Versuche, ihr einen String zuzuweisen – was sagt der Compiler?',
                    'Declare a variable age with type number, initialize it to 25. Try assigning a string to it – what does the compiler say?'
                ),
            },
            {
                title: ls('any vs unknown', 'any vs unknown', 'any vs unknown'),
                description: ls(
                    'any va unknown farqini tushuntiring. Har biri uchun misol keltiring.',
                    'Erkläre in eigenen Worten den Unterschied zwischen any und unknown. Gib je ein Beispiel, wo du welchen Typ verwenden würdest.',
                    'Explain the difference between any and unknown in your own words. Give an example for each.'
                ),
            },
        ],
    },
    // 2. Interfaces & Type Aliases
    {
        title: ls('Interfeyslar va Type Aliases', 'Interfaces & Type Aliases', 'Interfaces & Type Aliases'),
        description: ls(
            'interface, type, farqlari, extends, readonly, ixtiyoriy xususiyatlar',
            'interface, type, Unterschiede, extends, readonly, optionale Properties',
            'interface, type, differences, extends, readonly, optional properties'
        ),
        homeworks: [
            {
                title: ls('Person interfeysi', 'Interface Person', 'Interface Person'),
                description: ls(
                    'Person interfeysini (name: string, age?: number, active: boolean) yarating. Ikki obyekt yarating: biri age bilan, biri siz.',
                    'Definiere ein Interface Person mit name: string, age?: number, active: boolean. Erstelle zwei Objekte: eines mit age, eines ohne.',
                    'Define an interface Person with name: string, age?: number, active: boolean. Create two objects: one with age, one without.'
                ),
            },
            {
                title: ls('Point type va masofa', 'Type Point & Distance', 'Type Point & Distance'),
                description: ls(
                    'type Point = { x: number; y: number } yarating. Masofani hisoblovchi distance(p1, p2) funksiyasini yozing.',
                    'Erstelle ein type Point = { x: number; y: number }. Schreibe eine Funktion distance(p1: Point, p2: Point): number, die die euklidische Distanz berechnet.',
                    'Create a type Point = { x: number; y: number }. Write a function distance(p1: Point, p2: Point): number that calculates the Euclidean distance.'
                ),
            },
            {
                title: ls('Readonly ID', 'Readonly ID', 'Readonly ID'),
                description: ls(
                    'Person interfeysini readonly id: string bilan kengaytiring. id ni o‘zgartirib ko‘ring.',
                    'Erweitere Person mit einem readonly id: string. Versuche, id nach der Initialisierung zu ändern – was passiert? Warum ist readonly nützlich?',
                    'Extend Person with a readonly id: string. Try changing id after initialization – what happens? Why is readonly useful?'
                ),
            },
        ],
    },
    // 3. Funktionen & Signatures
    {
        title: ls('Funksiyalar va Signaturalar', 'Funktionen & Signatures', 'Functions & Signatures'),
        description: ls(
            'Function types, optional params, default values, rest params, overloads',
            'Function types, optional params, default values, rest params, overload signatures',
            'Function types, optional params, default values, rest params, overload signatures'
        ),
        homeworks: [
            {
                title: ls('Sum funksiyasi', 'Funktion sum', 'Function sum'),
                description: ls(
                    'sum(...nums: number[]): number funksiyasini yozing. 0, 1, 3 ta son bilan tekshiring.',
                    'Schreibe eine Funktion sum(...nums: number[]): number, die beliebig viele Zahlen addiert. Teste mit 0, 1, 3 Zahlen.',
                    'Write a function sum(...nums: number[]): number that adds any number of arguments. Test with 0, 1, 3 numbers.'
                ),
            },
            {
                title: ls('formatDate funksiyasi', 'Funktion formatDate', 'Function formatDate'),
                description: ls(
                    'formatDate(date: Date, format?: "short" | "long") funksiyasini yarating.',
                    "Definiere eine Funktion formatDate(date: Date, format?: 'short' | 'long'): Bei 'short' → 'DD.MM.YY', sonst ausführlich. Nutze Intl.DateTimeFormat.",
                    "Define a function formatDate(date: Date, format?: 'short' | 'long'). For 'short' → 'DD.MM.YY', otherwise detailed. Use Intl.DateTimeFormat."
                ),
            },
            {
                title: ls('Overload: getLength', 'Overload: getLength', 'Overload: getLength'),
                description: ls(
                    'getLength(input: string) va getLength(input: any[]) uchun overload yozing.',
                    'Erstelle eine Funktionsüberladung für getLength(input: string): number und getLength(input: any[]): number. Was passiert bei getLength(42)?',
                    'Create a function overload for getLength(input: string): number and getLength(input: any[]): number. What happens with getLength(42)?'
                ),
            },
        ],
    },
    // 4. Generics
    {
        title: ls('Generiklar', 'Generics', 'Generics'),
        description: ls(
            '<T>, extends, constraints, generic functions, utility types',
            '<T>, extends, constraints, generic functions, interfaces, utility types (Partial, Pick)',
            '<T>, extends, constraints, generic functions, interfaces, utility types (Partial, Pick)'
        ),
        homeworks: [
            {
                title: ls('identity<T>', 'identity<T>', 'identity<T>'),
                description: ls(
                    'Generik identity<T>(value: T): T funksiyasini yozing. string, number, obyekt bilan tekshiring.',
                    'Schreibe eine generische Funktion identity<T>(value: T): T, die den Wert unverändert zurückgibt. Teste mit string, number, {a:1}.',
                    'Write a generic function identity<T>(value: T): T that returns the value unchanged. Test with string, number, {a:1}.'
                ),
            },
            {
                title: ls('Repository<T>', 'Repository<T>', 'Repository<T>'),
                description: ls(
                    'Repository<T> interfeysini yarating (add, get metodlari). User tipi uchun implementatsiya qiling.',
                    'Erstelle ein Interface Repository<T> mit Methoden add(item: T): void, get(id: string): T | undefined. Implementiere es für User = { id: string; name: string }.',
                    'Create an interface Repository<T> with methods add(item: T): void, get(id: string): T | undefined. Implement it for User = { id: string; name: string }.'
                ),
            },
            {
                title: ls('Partial va Pick', 'Partial und Pick', 'Partial and Pick'),
                description: ls(
                    'Partial<User> va Pick<User, "name"> yordamida tiplar yarating.',
                    "Nutze Partial<User> und Pick<User, 'name'>, um zwei neue Typen zu definieren. Erstelle ein Objekt für jeden Typ – welche Felder sind erlaubt?",
                    "Use Partial<User> and Pick<User, 'name'> to define two new types. Create an object for each – which fields are allowed?"
                ),
            },
        ],
    },
    // 5. Klassen & OOP
    {
        title: ls('Klasslar va OOP', 'Klassen & OOP', 'Classes & OOP'),
        description: ls(
            'class, constructor, public/private/protected, static, abstract, implements',
            'class, constructor, public/private/protected, static, abstract, implements',
            'class, constructor, public/private/protected, static, abstract, implements'
        ),
        homeworks: [
            {
                title: ls('Calculator klassi', 'Klasse Calculator', 'Class Calculator'),
                description: ls(
                    'Calculator klassini yarating (add, multiply). private xotiradan foydalaning.',
                    'Erstelle eine Klasse Calculator mit Methoden add(a: number, b: number): number und multiply(a: number, b: number): number. Nutze private für interne Zwischenspeicher.',
                    'Create a class Calculator with methods add(a: number, b: number): number and multiply(a: number, b: number): number. Use private for internal storage.'
                ),
            },
            {
                title: ls('Abstract Shape', 'Abstract Shape', 'Abstract Shape'),
                description: ls(
                    'Abstract Shape klassini yarating (area metodi). Rectangle va Circle yarating.',
                    'Definiere eine abstrakte Klasse Shape mit abstract area(): number. Leite Rectangle und Circle davon ab. Nutze implements für ein Interface Drawable.',
                    'Define an abstract class Shape with abstract area(): number. Derive Rectangle and Circle from it. Use implements for an interface Drawable.'
                ),
            },
            {
                title: ls('Static Utils', 'Static Utils', 'Static Utils'),
                description: ls(
                    'Static Utils.isPositive(n) metodini yozing. Uni qanday chaqirasiz?',
                    'Erstelle eine statische Methode Utils.isPositive(n: number): boolean. Wie rufst du sie auf? Warum kann man sie nicht über eine Instanz aufrufen?',
                    'Create a static method Utils.isPositive(n: number): boolean. How do you call it? Why can’t you call it via an instance?'
                ),
            },
        ],
    },
    // 6. Enums & Literaltypes
    {
        title: ls('Enumlar va Literal Tiplar', 'Enums & Literaltypes', 'Enums & Literaltypes'),
        description: ls(
            'enum, const enum, string enums, union types, literal types',
            'enum, const enum, string enums, union types, literal types (\'success\' | \'error\')',
            'enum, const enum, string enums, union types, literal types (\'success\' | \'error\')'
        ),
        homeworks: [
            {
                title: ls('Status Enum', 'Status Enum', 'Status Enum'),
                description: ls(
                    'Status enum (Pending, Success, Error) yarating. getStatusMessage funksiyasini yozing.',
                    'Definiere ein enum Status { Pending, Success, Error }. Schreibe eine Funktion getStatusMessage(s: Status): string.',
                    'Define an enum Status { Pending, Success, Error }. Write a function getStatusMessage(s: Status): string.'
                ),
            },
            {
                title: ls('Direction Literal', 'Direction Literal', 'Direction Literal'),
                description: ls(
                    "Direction tipi ('up' | 'down'...) va move funksiyasini yarating.",
                    "Erstelle einen Typ Direction = 'up' | 'down' | 'left' | 'right'. Schreibe eine Funktion move(pos: {x: number, y: number}, dir: Direction, step: number).",
                    "Create a type Direction = 'up' | 'down' | 'left' | 'right'. Write a function move(pos: {x: number, y: number}, dir: Direction, step: number)."
                ),
            },
            {
                title: ls('Enum vs const enum', 'Enum vs const enum', 'Enum vs const enum'),
                description: ls(
                    'Color enumi va const enumi farqini tushuntiring.',
                    "Vergleiche enum Color { Red = '#ff0000', ... } mit const enum. Was passiert bei Kompilierung? Wann nutzt du const enum?",
                    "Compare enum Color { Red = '#ff0000', ... } with const enum. What happens on compilation? When do you use const enum?"
                ),
            },
        ],
    },
    // 7. Type Guards & Narrowing
    {
        title: ls('Type Guards & Narrowing', 'Type Guards & Narrowing', 'Type Guards & Narrowing'),
        description: ls(
            'typeof, instanceof, in, is-guards, discriminated unions',
            'typeof, instanceof, in, is-guards, discriminated unions',
            'typeof, instanceof, in, is-guards, discriminated unions'
        ),
        homeworks: [
            {
                title: ls('printValue (typeof)', 'printValue (typeof)', 'printValue (typeof)'),
                description: ls(
                    'printValue(val: string | number) funksiyasini yozing. Typeof ishlating.',
                    'Schreibe eine Funktion printValue(val: string | number), die je nach Typ anders formatiert ("String: ..." / "Number: ...") – nutze typeof.',
                    'Write a function printValue(val: string | number) that formats differently depending on type ("String: ..." / "Number: ...") – use typeof.'
                ),
            },
            {
                title: ls('Animal (Discriminated Union)', 'Animal (Discriminated Union)', 'Animal (Discriminated Union)'),
                description: ls(
                    'Animal (dog/cat) tipi va makeSound funksiyasini yozing.',
                    "Gegeben: type Animal = { type: 'dog'; bark: () => void } | { type: 'cat'; meow: () => void }. Schreibe eine makeSound(a: Animal): void.",
                    "Given: type Animal = { type: 'dog'; bark: () => void } | { type: 'cat'; meow: () => void }. Write a makeSound(a: Animal): void."
                ),
            },
            {
                title: ls('isEmployee (User Guard)', 'isEmployee (User Guard)', 'isEmployee (User Guard)'),
                description: ls(
                    'isEmployee user-defined type guard yozing.',
                    'Erstelle einen benutzerdefinierten Type Guard: function isEmployee(obj: any): obj is { id: string; role: string }. Teste mit einem falschen Objekt.',
                    'Create a user-defined type guard: function isEmployee(obj: any): obj is { id: string; role: string }. Test with a wrong object.'
                ),
            },
        ],
    },
    // 8. Advanced Types
    {
        title: ls('Murakkab Tiplar', 'Advanced Types', 'Advanced Types'),
        description: ls(
            'Mapped, Conditional, Indexed Access types, infer',
            'keyof, in, mapped types, conditional types, infer',
            'keyof, in, mapped types, conditional types, infer'
        ),
        homeworks: [
            {
                title: ls('ReadOnly<T>', 'ReadOnly<T>', 'ReadOnly<T>'),
                description: ls(
                    'Mapped Type ReadOnly<T> yozing. User interfeysi bilan tekshiring.',
                    'Schreibe einen Mapped Type ReadOnly<T>: { readonly [K in keyof T]: T[K] }. Teste mit einem Interface User.',
                    'Write a Mapped Type ReadOnly<T>: { readonly [K in keyof T]: T[K] }. Test with an interface User.'
                ),
            },
            {
                title: ls('GetValues<T>', 'GetValues<T>', 'GetValues<T>'),
                description: ls(
                    'GetValues<T> yozing (barcha qiymat tiplarini qaytaradi).',
                    'Definiere GetValues<T>: gibt ein Union aller Werttypen eines Objekts zurück (z. B. {a: string, b: number} → string | number).',
                    'Define GetValues<T>: returns a union of all value types of an object (e.g. {a: string, b: number} → string | number).'
                ),
            },
            {
                title: ls('IsArray<T>', 'IsArray<T>', 'IsArray<T>'),
                description: ls(
                    'Conditional Type IsArray<T> yozing.',
                    'Erstelle einen conditional Type IsArray<T>: true wenn T Array, sonst false. Nutze extends any[].',
                    'Create a conditional Type IsArray<T>: true if T is Array, else false. Use extends any[].'
                ),
            },
        ],
    },
    // 9. Utility Types
    {
        title: ls('Utility Types & Parameters', 'Utility Types & Parameters', 'Utility Types & Parameters'),
        description: ls(
            'Partial, Omit, Pick, ReturnType, Parameters',
            'Partial, Required, Record, Omit, Pick, ReturnType, Parameters, InstanceType',
            'Partial, Required, Record, Omit, Pick, ReturnType, Parameters, InstanceType'
        ),
        homeworks: [
            {
                title: ls('Omit & UserInput', 'Omit & UserInput', 'Omit & UserInput'),
                description: ls(
                    'Omit<User, "id"> ishlatib UserInput yarating.',
                    "Nutze Omit<User, 'id'> um einen neuen Typ UserInput zu erstellen. Erstelle ein Objekt davon.",
                    "Use Omit<User, 'id'> to create a new type UserInput. Create an object of it."
                ),
            },
            {
                title: ls('Parameters & ReturnType', 'Parameters & ReturnType', 'Parameters & ReturnType'),
                description: ls(
                    'apiCall funksiyasi uchun Parameters va ReturnType ni tekshiring.',
                    'Gegeben: function apiCall(...). Nutze Parameters<typeof apiCall> und ReturnType<typeof apiCall> – was ergibt das?',
                    'Given: function apiCall(...). Use Parameters<typeof apiCall> and ReturnType<typeof apiCall> – what is the result?'
                ),
            },
            {
                title: ls('callWithRetry', 'callWithRetry', 'callWithRetry'),
                description: ls(
                    'Generik callWithRetry funksiyasini yozing.',
                    'Erstelle eine generische Funktion callWithRetry<T extends (...args: any[]) => any>(fn: T, retries: number): ReturnType<T>.',
                    'Create a generic function callWithRetry<T extends (...args: any[]) => any>(fn: T, retries: number): ReturnType<T>.'
                ),
            },
        ],
    },
    // 10. Modules & Namespaces
    {
        title: ls('Modullar va Namespaces', 'Modules & Namespaces', 'Modules & Namespaces'),
        description: ls(
            'import/export, default vs named, d.ts',
            'import/export, default vs named, barrel files, declare module, ambient declarations',
            'import/export, default vs named, barrel files, declare module, ambient declarations'
        ),
        homeworks: [
            {
                title: ls('math.ts & main.ts', 'math.ts & main.ts', 'math.ts & main.ts'),
                description: ls(
                    'math.ts (add, mul) va main.ts yarating.',
                    'Erstelle zwei Dateien: math.ts (exportiert add, mul) und main.ts (importiert und nutzt beides).',
                    'Create two files: math.ts (exports add, mul) and main.ts (imports and uses both).'
                ),
            },
            {
                title: ls('Barrel File', 'Barrel File', 'Barrel File'),
                description: ls(
                    'index.ts barrel faylini yarating.',
                    'Erstelle ein barrel file index.ts, das alle Exporte aus einem Ordner sammelt. Wie sieht der Import in app.ts aus?',
                    'Create a barrel file index.ts that collects all exports from a folder. How does the import look in app.ts?'
                ),
            },
            {
                title: ls('.d.ts Declaration', '.d.ts Deklaration', '.d.ts Declaration'),
                description: ls(
                    'mylib uchun .d.ts fayl yozing (hello() funksiyasi).',
                    'Schreibe eine .d.ts-Datei für ein externes Modul mylib, das eine Funktion hello(): string exportiert.',
                    'Write a .d.ts file for an external module mylib that exports a function hello(): string.'
                ),
            },
        ],
    },
    // 11. Decorators
    {
        title: ls('Dekoratorlar', 'Decorators (Experimental)', 'Decorators (Experimental)'),
        description: ls(
            'Class, method, property decorators, metadata',
            'Class, method, property decorators, @sealed, metadata reflection',
            'Class, method, property decorators, @sealed, metadata reflection'
        ),
        homeworks: [
            {
                title: ls('@readonly Decorator', '@readonly Decorator', '@readonly Decorator'),
                description: ls(
                    '@readonly property decoratorini yozing.',
                    'Schreibe einen @readonly Property-Decorator, der versucht, eine Eigenschaft nach der Initialisierung schreibgeschützt zu machen.',
                    'Write a @readonly property decorator that attempts to make a property read-only after initialization.'
                ),
            },
            {
                title: ls('@log Decorator', '@log Decorator', '@log Decorator'),
                description: ls(
                    '@log method decoratorini yozing.',
                    'Erstelle einen @log Method-Decorator, der vor/nach Aufruf console.log ausgibt (inkl. Parameter und Rückgabe).',
                    'Create a @log method decorator that logs to console before/after call (incl. parameters and return value).'
                ),
            },
            {
                title: ls('Config', 'Config', 'Config'),
                description: ls(
                    'Nima uchun decoratorlar experimental ekanligini tushuntiring.',
                    'Erkläre, warum Decorators experimental sind und was du in tsconfig.json aktivieren musst.',
                    'Explain why decorators are experimental and what you need to enable in tsconfig.json.'
                ),
            },
        ],
    },
    // 12. Async/Await
    {
        title: ls('Async/Await & Promises', 'Async/Await & Promises', 'Async/Await & Promises'),
        description: ls(
            'Promise<T>, void vs never, error handling',
            'async/await, Promise<T>, void, never, error handling, try/catch mit Typen',
            'async/await, Promise<T>, void, never, error handling, try/catch with types'
        ),
        homeworks: [
            {
                title: ls('fetchUser', 'fetchUser', 'fetchUser'),
                description: ls(
                    'fetchUser funksiyasini yozing. try/catch ishlating.',
                    'Schreibe eine Funktion fetchUser(id: string): Promise<User | null>. Nutze try/catch und typisiere den Fehler.',
                    'Write a function fetchUser(id: string): Promise<User | null>. Use try/catch and type the error.'
                ),
            },
            {
                title: ls('Generic retry', 'Generic retry', 'Generic retry'),
                description: ls(
                    'Generik retry<T> funksiyasini yozing.',
                    'Erstelle eine generische retry<T>(fn: () => Promise<T>, maxRetries: number): Promise<T>. Behandle Fehler mit catch.',
                    'Create a generic retry<T>(fn: () => Promise<T>, maxRetries: number): Promise<T>. Handle errors with catch.'
                ),
            },
            {
                title: ls('Void vs Never', 'Void vs Never', 'Void vs Never'),
                description: ls(
                    'Promise<void> va Promise<never> farqini tushuntiring.',
                    'Was ist der Unterschied zwischen Promise<void> und Promise<never>? Gib je ein Beispiel.',
                    'What is the difference between Promise<void> and Promise<never>? Give an example for each.'
                ),
            },
        ],
    },
    // 13. Advanced Patterns
    {
        title: ls('Ilg‘or Patternlar', 'Advanced Patterns', 'Advanced Patterns'),
        description: ls(
            'Zustand, FP, Pipes, State Machines',
            'Immutability, functional pipelines, Option, Either, state machines',
            'Immutability, functional pipelines, Option, Either, state machines'
        ),
        homeworks: [
            {
                title: ls('Option<T>', 'Option<T>', 'Option<T>'),
                description: ls(
                    'Option<T> tipini (Some/None) va map metodini yozing.',
                    'Implementiere eine simple Option<T>-Typ-Struktur (wie in Scala/F#): Some(value: T) oder None. Schreibe map, getOrElse.',
                    'Implement a simple Option<T> type structure (like in Scala/F#): Some(value: T) or None. Write map, getOrElse.'
                ),
            },
            {
                title: ls('Pipe Function', 'Pipe Function', 'Pipe Function'),
                description: ls(
                    'pipe funksiyasini yozing.',
                    'Erstelle eine Pipe-Funktion: pipe(value: any, ...fns: ((x: any) => any)[]): any. Teste mit x => x + 1, x => x * 2.',
                    'Create a Pipe function: pipe(value: any, ...fns: ((x: any) => any)[]): any. Test with x => x + 1, x => x * 2.'
                ),
            },
            {
                title: ls('LoadingState', 'LoadingState', 'LoadingState'),
                description: ls(
                    'LoadingState discriminated union va handleState funksiyasini yozing.',
                    "Gegeben: type LoadingState = { status: 'loading' } ... Schreibe handleState, die alle Fälle abdeckt.",
                    "Given: type LoadingState = { status: 'loading' } ... Write handleState covering all cases."
                ),
            },
        ],
    },
    // 14. React Integration
    {
        title: ls('React Integratsiyasi', 'Integration mit React', 'Integration with React'),
        description: ls(
            'React.FC, props, hooks, generics',
            'React.FC, props typing, hooks (useState, useEffect), generics in components, forwardRef',
            'React.FC, props typing, hooks (useState, useEffect), generics in components, forwardRef'
        ),
        homeworks: [
            {
                title: ls('Button Component', 'Button Component', 'Button Component'),
                description: ls(
                    'Button komponentini (label, disabled) React.FC bilan yozing.',
                    'Erstelle eine Komponente Button mit Props { label: string; disabled?: boolean }. Nutze React.FC.',
                    'Create a component Button with props { label: string; disabled?: boolean }. Use React.FC.'
                ),
            },
            {
                title: ls('useLocalStorage<T>', 'useLocalStorage<T>', 'useLocalStorage<T>'),
                description: ls(
                    'Generik useLocalStorage huukini yozing.',
                    'Schreibe einen generischen Hook useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void].',
                    'Write a generic hook useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void].'
                ),
            },
            {
                title: ls('Modal & forwardRef', 'Modal & forwardRef', 'Modal & forwardRef'),
                description: ls(
                    'Modal komponentini (children, onClose) forwardRef bilan yozing.',
                    'Erstelle eine Modal-Komponente mit children, onClose, und isOpen: boolean. Nutze React.PropsWithChildren und forwardRef.',
                    'Create a Modal component with children, onClose, and isOpen: boolean. Use React.PropsWithChildren and forwardRef.'
                ),
            },
        ],
    },
    // 15. Projekt & Best Practices
    {
        title: ls('Loyiha va Best Practices', 'Projekt & Best Practices', 'Project & Best Practices'),
        description: ls(
            'Project structure, linting, testing, migration',
            'Project structure, linting (eslint), testing (vitest/jest), CI, strict mode, migration von JS',
            'Project structure, linting (eslint), testing (vitest/jest), CI, strict mode, migration from JS'
        ),
        homeworks: [
            {
                title: ls('tsconfig.json', 'tsconfig.json', 'tsconfig.json'),
                description: ls(
                    'Strict rejimli tsconfig.json yarating.',
                    "Erstelle eine tsconfig.json mit strict: true, noImplicitAny: true, esModuleInterop: true, target: 'ES2022'.",
                    "Create a tsconfig.json with strict: true, noImplicitAny: true, esModuleInterop: true, target: 'ES2022'."
                ),
            },
            {
                title: ls('Unit Test (Vitest)', 'Unit Test (Vitest)', 'Unit Test (Vitest)'),
                description: ls(
                    'calculateDiscount funksiyasi uchun unit test yozing.',
                    'Schreibe einen einfachen Unit-Test (mit vitest) für eine Funktion calculateDiscount(price: number, rate: number): number.',
                    'Write a simple unit test (with vitest) for a function calculateDiscount(price: number, rate: number): number.'
                ),
            },
            {
                title: ls('JS Migration', 'JS Migration', 'JS Migration'),
                description: ls(
                    'JS loyihani TS ga o‘tkazish jarayonini tasvirlab bering.',
                    'Du hast ein altes JS-Projekt. Beschreibe Schritt-für-Schritt, wie du es schrittweise nach TypeScript migrierst.',
                    'You have an old JS project. Describe step-by-step how you migrate it gradually to TypeScript.'
                ),
            },
        ],
    },
];
