import express from 'express';
import type { MoviesRepository } from "./repositories/MovieRepository";
import { ResponseInterval } from './types/Response';
import { CalculateIntervalService } from './services/CalculateIntervalService';


export function createApp(deps: { repo: MoviesRepository }) {
  const app = express();

  app.get("/intervals", (_req, res) => {
    const rows = deps.repo.findAllWinners();
    const result: ResponseInterval =
      new CalculateIntervalService().resolve(rows);
    res.json(result);
  });


  return app;
}
