import { rest } from "msw"
import { setupServer } from "msw/node"

import * as metallicaSongs from "../test/testdata/songsterr.metallica.songs.json"
import { SongsterrSongsRepository } from "./repo.songsterr"

const BASE_URL = "https://localhost"

describe("Songsterr songs repository", () => {
  const server = setupServer(
    rest.get(`${BASE_URL}/api/songs`, (req, res, ctx) => {
      return res(ctx.json(metallicaSongs))
    })
  )

  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  test.todo("songsByName calls fetch with the right args and returns the songs")

  test("songsByArtist calls fetch with the right args and returns the songs", async () => {
    const repo = new SongsterrSongsRepository(BASE_URL)

    const songs = await repo.songsByArtist("metallica")
    expect(songs.length).toBe(0)
  })
})
