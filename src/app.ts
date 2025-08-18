import express from 'express';
import path from 'path';
import fs from 'fs';
import { insert, setup } from './repositories/MoviesRepository';
import { CsvImporterService } from './services/CsvImporterService';
import router from './routes/route';
import { CSV_PATH } from './config';

export async function createApp() {
  const app = express();

  await setup();

  const csvPath = path.resolve(CSV_PATH);
  const csvText = fs.readFileSync(csvPath, 'utf-8');
  const moviesList = CsvImporterService.resolve(csvText);
  insert(moviesList);

  app.use('/api', router);

  return app;
}