const request = require("supertest");
const { app, server } = require("./server.js"); 

describe("CS0320 Random (Bored) API", () => {

    afterAll(() => {
        server.close(); // closes the server after tests
    });

    test("GET / should return welcome message", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain("Welcome to the CS0320 Random (Bored) API!");
    });

    test("GET /api/activity should return a random activity", async () => {
        const res = await request(app).get("/api/activity");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("activity");
        expect(res.body).toHaveProperty("type");
        expect(res.body).toHaveProperty("participants");
    });

    test("GET /api/activity?participants=2 should return a valid activity with 2 participants", async () => {
        const res = await request(app).get("/api/activity?participants=2");
        expect(res.statusCode).toBe(200);
        expect(res.body.participants).toBe(2);
    });

    test("GET /api/activity?participants=99 should return a 404 error", async () => {
        const res = await request(app).get("/api/activity?participants=99");
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: "No activities found for given parameters" });
    });

    test("GET /api/activities should return all activities", async () => {
        const res = await request(app).get("/api/activities");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test("GET /api/activities/filter?participants=1 should return all activities with 1 participant", async () => {
        const res = await request(app).get("/api/activities/filter?participants=1");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        res.body.forEach(activity => {
            expect(activity.participants).toBe(1);
        });
    });

    test("GET /api/activities/filter?participants=3 should return all activities with 3 participants", async () => {
        const res = await request(app).get("/api/activities/filter?participants=3");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        res.body.forEach(activity => {
            expect(activity.participants).toBe(3);
        });
    });

    test("GET /api/activities/filter?participants=99 should return 404 error", async () => {
        const res = await request(app).get("/api/activities/filter?participants=99");
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: "No activities found for given participant count" });
    });

    test("GET /api/activities/filter without participants should return 400 error", async () => {
        const res = await request(app).get("/api/activities/filter");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Please provide a valid participants number" });
    });

});
