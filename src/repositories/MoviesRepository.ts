import { execDatabase, initDatabase, runDatabase } from "../db";
import type { Movie } from "../types/Movie";


export async function setup() {
    await initDatabase();

    execDatabase(`
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

export function insert(movies: Movie[]) {
    movies.forEach(movie => {
        runDatabase(`
            INSERT INTO movies (year, title, studios, producers, winner)
             VALUES (?, ?, ?, ?, ?)
        `,
            [movie.year, movie.title, movie.studios, movie.producers, movie.winner ? 1 : 0]);
    });
}

export function GetMovies() {
    const res = execDatabase(`
    SELECT producers, year
    FROM movies
    WHERE winner = 1
    ORDER BY producers, year
  `);

  return res;
}