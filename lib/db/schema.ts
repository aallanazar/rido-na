import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

/* ── users ── */
export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    name: text('name').notNull(),
    language: text('language').notNull().default('de'),
    createdAt: text('created_at').notNull().default('datetime("now")'),
});

/* ── progress ── */
export const progress = sqliteTable('progress', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id),
    key: text('key').notNull(),           // e.g. "courseModule:coding:python:1"
    value: integer('value').notNull(),    // 0-100
    updatedAt: text('updated_at').notNull().default('datetime("now")'),
});

/* ── quiz_results ── */
export const quizResults = sqliteTable('quiz_results', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id),
    quizKey: text('quiz_key').notNull(),  // e.g. "quiz:coding:python:1"
    answers: text('answers').notNull(),   // JSON string
    score: integer('score'),
    showSolutions: integer('show_solutions').notNull().default(0),
    completedAt: text('completed_at').notNull().default('datetime("now")'),
});

/* ── notes ── */
export const notes = sqliteTable('notes', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id),
    noteKey: text('note_key').notNull(),
    content: text('content').notNull().default(''),
    updatedAt: text('updated_at').notNull().default('datetime("now")'),
});

/* ── homework_submissions ── */
export const homeworkSubmissions = sqliteTable('homework_submissions', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id),
    homeworkId: text('homework_id').notNull(),
    solution: text('solution').notNull().default(''),
    submittedAt: text('submitted_at').notNull().default('datetime("now")'),
});
