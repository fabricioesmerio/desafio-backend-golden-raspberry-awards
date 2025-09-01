import initSqlJs, { Database } from "sql.js";


export async function createSqljsDb(): Promise<Database> {
    const sql = await initSqlJs(
        {
            locateFile: (file) => require.resolve(`sql.js/dist/${file}`)
        }
    );

    return new sql.Database();
}