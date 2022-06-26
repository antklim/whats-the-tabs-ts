import { agent as request } from "supertest"
import app from "./app"

describe("App default settings", () => {
  test("it responses with 404 Not Found for unknown routes", async () => {
    const res = await request(app.callback()).get("/unknown")
    expect(res.statusCode).toBe(404)
  })
})
