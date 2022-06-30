import Koa from "koa"
import { agent as request } from "supertest"
import router from "./info"

describe("Info route", () => {
  // When router exported it's possible to test it in isolation. Don't need to
  // bring the whole application. When do so, make sure to have a test to verify
  // that the main application has this route registered.

  const app = new Koa()
  app.use(router.routes())

  test("responses with app information", async () => {
    const res = await request(app.callback()).get("/info")

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ info: "whats-the-tabs-ts v0.1.0" })
    expect(res.get("Content-Type")).toMatch(/json/)
  })
})
