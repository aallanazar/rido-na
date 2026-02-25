/* eslint-disable @typescript-eslint/no-explicit-any */

let db: any = null;
let isAvailable = false;

try {
  // Dynamic import to avoid build-time errors on Vercel
  // better-sqlite3 is a native module that only works in Node.js (not Vercel serverless)
  const Database = require('better-sqlite3');
  const { drizzle } = require('drizzle-orm/better-sqlite3');
  const schema = require('./schema');
  const path = require('path');

  const DB_PATH = path.join(process.cwd(), 'ridona.db');
  const sqlite = new Database(DB_PATH);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');

  db = drizzle(sqlite, { schema });

  /* Auto-create tables */
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      language TEXT NOT NULL DEFAULT 'de',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      key TEXT NOT NULL,
      value INTEGER NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(user_id, key)
    );

    CREATE TABLE IF NOT EXISTS quiz_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      quiz_key TEXT NOT NULL,
      answers TEXT NOT NULL DEFAULT '{}',
      score INTEGER,
      show_solutions INTEGER NOT NULL DEFAULT 0,
      completed_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(user_id, quiz_key)
    );

    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      note_key TEXT NOT NULL,
      content TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(user_id, note_key)
    );

    CREATE TABLE IF NOT EXISTS homework_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      homework_id TEXT NOT NULL,
      solution TEXT NOT NULL DEFAULT '',
      submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(user_id, homework_id)
    );
  `);

  isAvailable = true;
} catch {
  // Database not available (Vercel, missing native module, etc.)
  // The app will work in client-only mode using localStorage
  console.warn('[Ridona DB] SQLite not available — running in client-only mode. All data stored in localStorage.');
  db = null;
  isAvailable = false;
}

export { db, isAvailable as dbAvailable };
