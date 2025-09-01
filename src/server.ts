import { createApp } from "./app";
import * as path from "node:path";
import { createSqljsDb } from "./db/sqljs";
import { bootstrap } from "./bootstrap";
import { CsvLoader } from "./services/CsvLoader";
import { CsvImporterService } from "./services/CsvImporterService";

const CSV_PATH = process.env.CSV_PATH || path.resolve("data", "movielist.csv");
const PORT = Number(process.env.PORT || 3000);


(async () => {
  const db = await createSqljsDb();

  const { repo } = await bootstrap({
    db,
    csvLoader: new CsvLoader(CSV_PATH),
    importer: CsvImporterService,
  });

  const app = createApp({ repo });
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
})();