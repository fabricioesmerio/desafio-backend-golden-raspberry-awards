import * as fs from "node:fs/promises";

export interface iCsvLoader {
    load(): Promise<string>
}


export class CsvLoader implements iCsvLoader {
    constructor(private path: string) { }

    async load(): Promise<string> {
        return fs.readFile(this.path, "utf-8");
    }
}

export class StringCsvLoader implements iCsvLoader {
    constructor(private data: string) { }

    async load(): Promise<string> {
        return this.data;
    }
}