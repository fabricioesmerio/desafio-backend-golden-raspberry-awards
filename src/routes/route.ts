import express from 'express';
import { GetMovies } from '../repositories/MoviesRepository';
import { CalculateIntervalService } from '../services/CalculateIntervalService';

const router = express.Router();

router.get('/intervals', (req, res) => {
    try {
        const queryResult = GetMovies();

        const rows = queryResult.length > 0
            ? queryResult[0].values
            : [];

        const calculateIntervalService = new CalculateIntervalService();

        const response = calculateIntervalService.resolve(rows);

        res.json(response)
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
});

export default router;