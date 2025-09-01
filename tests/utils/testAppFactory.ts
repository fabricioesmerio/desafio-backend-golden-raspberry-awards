import { createSqljsDb } from "../../src/db/sqljs";
import { bootstrap } from "../../src/bootstrap";
import { StringCsvLoader } from "../../src/services/CsvLoader";
import { CsvImporterService } from "../../src/services/CsvImporterService";
import { createApp } from "../../src/app";

export async function buildTestApp(csvText: string) {
    const db = await createSqljsDb();
    const { repo } = await bootstrap({
        db,
        csvLoader: new StringCsvLoader(csvText),
        importer: CsvImporterService,
    });
    const app = createApp({ repo });
    return { app, repo, db };
}