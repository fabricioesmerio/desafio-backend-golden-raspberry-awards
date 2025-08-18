import { parse } from "csv-parse/sync";
import type { Movie } from "../types/Movie";

export class CsvImporterService {
    static resolve(text: string): Movie[] {
        const rows = parse(text, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
            delimiter: ';'
        }) as any[];

        return rows.map(r => ({
            year: Number(r.year),
            title: r.title,
            studios: r.studios,
            producers: r.producers,
            winner: r.winner?.toLowerCase() === 'yes'
        }))
    }
}