import { MoviesRepository } from "./repositories/MovieRepository";
import { iCsvLoader } from "./services/CsvLoader";
import { Movie } from "./types/Movie";
import type { Database } from "sql.js";


type Importer = { resolve(csvText: string): Movie[] };

export async function bootstrap({
    db,
    csvLoader,
    importer
}: {
    db: Database;
    csvLoader: iCsvLoader;
    importer: Importer;
}
) {
    const repo = new MoviesRepository(db);
    repo.initSchema();

    const csvText = await csvLoader.load();
    const movies = importer.resolve(csvText);
    repo.insertMany(movies);

    return { repo };
}