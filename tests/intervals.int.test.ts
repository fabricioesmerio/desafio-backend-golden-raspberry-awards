import { buildTestApp } from "./utils/testAppFactory";
import request from "supertest";
import path from "path";
import fs from "fs";

const route = "/intervals";

describe("Integration test for the Golden Raspberry Awards API", () => {

    it("should calculate interval with a simple dataset", async () => {
        const csvFake = `
            year;title;studios;producers;winner
            1980;Movie A;Studio X;Producer 1;yes
            1985;Movie B;Studio X;Producer 1;yes
            1990;Movie C;Studio Y;Producer 2;no
        `.trim();

        const { app } = await buildTestApp(csvFake);

        const res = await request(app).get(route);
        expect(res.status).toBe(200);
        expect(res.body.min[0].producer).toBe("Producer 1");
        expect(res.body.min[0].interval).toBe(5);
        expect(res.body.max[0].producer).toBe("Producer 1");
        expect(res.body.max[0].interval).toBe(5);
    });

    it("should return empty when there are no winners", async () => {
        const csvFake = `
            year;title;studios;producers;winner
            1980;Movie A;Studio X;Producer 1;no
            1985;Movie B;Studio X;Producer 1;no
        `.trim();

        const { app } = await buildTestApp(csvFake);
        const res = await request(app).get(route);

        expect(res.status).toBe(200);
        expect(res.body.min).toHaveLength(0);
        expect(res.body.max).toHaveLength(0);

    });

    it("should handle multiple producers and winners correctly", async () => {
        const csvFake = `
            year;title;studios;producers;winner
            2000;Movie D;Studio Z;Producer X;yes
            2001;Movie E;Studio Z;Producer X;yes
            2003;Movie F;Studio X;Producer A;yes
            2004;Movie G;Studio X;Producer A;yes
            2006;Movie J;Studio J;Producer J;yes
            2007;Movie H;Studio A;Producer Y;yes
            2009;Movie J 2;Studio J;Producer J;yes
            2017;Movie I;Studio A;Producer Y;yes
            2010;Movie K;Studio B;Producer T;yes
            2020;Movie L;Studio B;Producer T;yes
        `.trim();

        const { app } = await buildTestApp(csvFake);
        const res = await request(app).get(route);

        expect(res.status).toBe(200);
        expect(res.body.min).toHaveLength(2);
        expect(res.body.max).toHaveLength(2);
        expect(res.body.min[0].interval).toBe(1);
        expect(res.body.max[0].interval).toBe(10);
    });

    it("should match results from the original dataset", async () => {
        const csvPath = path.resolve(__dirname, "../data/movielist.csv");
        const csvOriginal = fs.readFileSync(csvPath, "utf-8");

        const { app } = await buildTestApp(csvOriginal);
        const res = await request(app).get(route);

        expect(res.status).toBe(200);
        expect(res.body.min).toHaveLength(1);
        expect(res.body.max).toHaveLength(1);
        expect(res.body.min[0]).toEqual({
            producer: "Joel Silver",
            interval: 1,
            previousWin: 1990,
            followingWin: 1991
        });
        expect(res.body.max[0]).toEqual({
            producer: "Matthew Vaughn",
            interval: 13,
            previousWin: 2002,
            followingWin: 2015
        });
    })
})
