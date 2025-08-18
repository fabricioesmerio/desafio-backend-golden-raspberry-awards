import { SqlValue } from "sql.js";
import { ResponseItem, ResponseInterval } from "src/types/Response";

export class CalculateIntervalService {

    resolve(rows: SqlValue[][]): ResponseInterval {
        const producersWin: Record<string, number[]> = {};

        for (const [producer, year] of rows) {

            const producerName = producer?.toString().split(/, | and /) || [];

            producerName.forEach(name => {
                if (!producersWin[name]) producersWin[name] = [];
                producersWin[name].push(Number(year));
            })

        }
        const producersWithLeastTwoWins: Array<ResponseItem> = this.getProducersWithLeastTwoWins(producersWin);

        return this.getResponseInterval(producersWithLeastTwoWins);
    }

    private getResponseInterval(producersWithLeastTwoWins: ResponseItem[]): ResponseInterval {
        
        if (producersWithLeastTwoWins.length === 0) return { max: [], min: [] }

        const minInterval = producersWithLeastTwoWins.reduce((p, c) => p.interval < c.interval ? p : c);
        const maxInterval = producersWithLeastTwoWins.reduce((p, c) => p.interval > c.interval ? p : c);
        
        const response: ResponseInterval = {
            min: producersWithLeastTwoWins.filter(item => item.interval === minInterval.interval),
            max: producersWithLeastTwoWins.filter(item => item.interval === maxInterval.interval)
        }

        return response;
    }

    private getProducersWithLeastTwoWins(producersWin: Record<string, number[]>): Array<ResponseItem> {
        const producersWithLeastTwoWins: Array<ResponseItem> = [];

        Object.entries(producersWin)
            .forEach(([name, years]) => {

                if (years.length <= 1) return;

                const tempYears = [...years.sort((a, b) => a > b ? 1 : -1)];
                const lastYear = Number(tempYears.pop());
                const firstYear = Number(tempYears.pop());
                const interval = Math.abs(lastYear - firstYear);

                if (Number.isNaN(interval)) return;

                producersWithLeastTwoWins.push({
                    producer: name,
                    interval: interval,
                    previousWin: firstYear,
                    followingWin: lastYear
                })
            });

        return producersWithLeastTwoWins;
    }

}