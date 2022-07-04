import Koa from "koa"
import { agent as request } from "supertest"
import { SongsUseCase } from "../songs/index"
import { songsRepositoryFactory } from "../songs/test.utils"
import router from "./songs"

describe("Songs route", () => {
  // When router exported it's possible to test it in isolation. Don't need to
  // bring the whole application. When do so, make sure to have a test to verify
  // that the main application has this route registered.

  const repo = songsRepositoryFactory()
  const songsUseCase = new SongsUseCase(repo)

  const app = new Koa()
  app.use(router(songsUseCase).routes())

  test("responses with the songs that match song name", async () => {
    const res = await request(app.callback()).get("/songs?title=life&limit=10")

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      songs: [{ id: 1, artist: "Bon Jovi", title: "It's My Life" }],
    })
    expect(res.get("Content-Type")).toMatch(/json/)
  })

  test("responses with the songs that match artist name", async () => {
    const res = await request(app.callback()).get("/songs?artist=ac&limit=10")

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      songs: [{ id: 3, artist: "AC/DC", title: "Thunderstruck" }],
    })
    expect(res.get("Content-Type")).toMatch(/json/)
  })

  test("responses with status code 404 when no songs found", async () => {
    const res = await request(app.callback()).get("/songs?limit=10")

    expect(res.statusCode).toBe(404)
    expect(res.text).toBe("no songs found")
  })
})
