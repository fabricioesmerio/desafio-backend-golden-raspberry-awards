import { SqlValue } from "sql.js";
import { ResponseItem, ResponseInterval } from "src/types/Response";

export class CalculateIntervalService {

    resolve(rows: [string, number][]): ResponseInterval {
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

        let min = Infinity;
        let max = -Infinity;
        let minItems: ResponseItem[] = [], maxItems: ResponseItem[] = [];

        for (const item of producersWithLeastTwoWins) {
            if (item.interval < min) {
                min = item.interval;
                minItems = [item];
            } else if (item.interval === min) {
                minItems.push(item)
            }

            if (item.interval > max) {
                max = item.interval;
                maxItems = [item];
            } else if (item.interval === max) {
                maxItems.push(item);
            }
        }

        return {
            max: maxItems,
            min: minItems
        }
    }

    private getProducersWithLeastTwoWins(producersWin: Record<string, number[]>): Array<ResponseItem> {
        const producersWithLeastTwoWins: Array<ResponseItem> = [];

        for (const [name, years] of Object.entries(producersWin)) {
            if (years.length <= 1) continue;

            const sortedYears = years.sort((a, b) => a - b);

            for (let i = 1; i < sortedYears.length; i++) {
                const interval = sortedYears[i] - sortedYears[i - 1];

                if (interval <= 0 || Number.isNaN(interval)) continue;
                producersWithLeastTwoWins.push({
                    producer: name,
                    interval: interval,
                    previousWin: sortedYears[i - 1],
                    followingWin: sortedYears[i]
                })

            }
        }

        return producersWithLeastTwoWins;
    }

}