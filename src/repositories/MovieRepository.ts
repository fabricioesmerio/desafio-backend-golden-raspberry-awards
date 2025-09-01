import { Database } from "sql.js";
import { Movie } from "src/types/Movie";


export class MoviesRepository {

    constructor(private db: Database) { }

    initSchema() {
        this.db.run(`
            CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                year INTEGER,
                title TEXT,
                studios TEXT,
                producers TEXT,
                winner INTEGER
            )
            `);
    }

    clear() {
        this.db.run(`DELETE FROM movies;`);
    }

    insertMany(rows: Movie[]) {
        const stmt = this.db.prepare(`
            INSERT INTO movies (year, title, studios, producers, winner)
            VALUES (?, ?, ?, ?, ?)
        `);

        try {
            for (const r of rows) {
                stmt.run([r.year, r.title, r.studios, r.producers, r.winner ? 1 : 0]);
            }
        } finally {
            stmt.free();
        }
    }

    findAllWinners(): Array<[string, number]> {
        const data: Array<[string, number]>  = [];

        const result = this.db.exec(`
            SELECT producers, year
            FROM movies
            WHERE winner = 1
        `);

        if(result.length === 0) return data;

        const rows = result[0].values;

        for (const [producers, year] of rows) {
            data.push([String(producers), Number(year)]);
        }

        return data;
    }
}