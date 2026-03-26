const request = require("supertest");
const app = require("../server");
const pool = require("../src/db/db");

describe("Listings API", () => {
  it("should return listings", async () => {
    const res = await request(app).get("/listings");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.results)).toBe(true);
  });

  it("should filter listings by suburb", async () => {
    const res = await request(app).get("/listings?suburb=Boudha");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.results)).toBe(true);
    expect(res.body.results.length).toBeGreaterThan(0);
    expect(res.body.results[0].suburb).toBe("Boudha");
  });

  it("should return a single listing by id", async () => {
    const res = await request(app).get("/listings/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.id).toBe(1);
  });
});

afterAll(async () => {
  await pool.end();
});