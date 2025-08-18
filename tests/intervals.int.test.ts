import request from 'supertest';
import { createApp } from "../src/app";


let app: any;
const ROUTE_API = "/api/intervals";

beforeAll(async () => {
    app = await createApp();
});

describe('Integration test for the Golden Raspberry Awards API', () => {
    it('Should return success when accessing the /intervals route', async () => {

        const res = await request(app).get(ROUTE_API);
        
        expect(res.status).toBe(200);
        expect(res.body.min).toBeTruthy();
        expect(res.body.max).toBeTruthy();
    });

    it('Should return 404 when accessing a non-existent route', async () => {

        const res = await request(app).get('/api/user');
        
        expect(res.status).toBe(404);
    });
})