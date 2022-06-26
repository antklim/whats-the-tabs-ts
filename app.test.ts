import { agent as request } from "supertest"
import app from "./app"

describe("App defaults", () => {
  test("app responses with 404 Not Found for unknown routes", async () => {
    await request(app.callback()).get("/unknown").expect(404)
  })

  describe("correlation ID", () => {
    test("app keeps provided correlation ID", async () => {
      const res = await request(app.callback()).get("/info").set("X-Correlation-Id", "my-correlation-id")
      expect(res.get("X-Correlation-Id")).toBe("my-correlation-id")
    })

    test("app adds correlation ID", async () => {
      const res = await request(app.callback()).get("/info")
      expect(res.get("X-Correlation-Id")).toBeDefined()
    })
  })
})
