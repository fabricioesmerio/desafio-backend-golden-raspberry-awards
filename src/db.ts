import initSqlJs from 'sql.js';
import type { Database, SqlJsStatic } from 'sql.js';

let SQL: SqlJsStatic | null = null;
let db: Database | null = null;

export async function initDatabase() {
    if (!SQL)
        SQL = await initSqlJs()

    if (!db)
        db = new SQL.Database();

    return db;
}

export function getDatabase(): Database {
    if (!db) throw new Error('Database not initialized');

    return db;
}

export function runDatabase(query: string, params: any[] = []) {
    return getDatabase().run(query, params);
}

export function execDatabase(query: string) {
    return getDatabase().exec(query);
}