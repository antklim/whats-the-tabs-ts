import Router from "koa-router"
import { Song } from "../songs"

// eslint-disable-next-line no-unused-vars
type getSongsFn = (pattern: string, limit?: number) => Song[]

interface SongsResponse {
  songs: Song[]
}

interface queryParameterToGetSongsFn {
  param: string
  fn: getSongsFn
}

interface SongsUseCase {
  songsByName: getSongsFn
  songsByArtist: getSongsFn
}

const queryParam = (q: string | string[] | undefined): string => {
  if (q === undefined) return ""
  return Array.isArray(q) ? q[0] : q
}

// numQueryParam parses query parameter and casts the value to a number.
// if query parameter value is invalid number then x used as a default value.
const numQueryParam = (q: string | string[] | undefined, x: number): number => {
  const v = queryParam(q)
  const rawNum = parseInt(v, 10)
  return isNaN(rawNum) ? x : rawNum
}

export default (songsUseCase: SongsUseCase) => {
  const qpfns: queryParameterToGetSongsFn[] = [
    { param: "artist", fn: songsUseCase.songsByArtist },
    { param: "title", fn: songsUseCase.songsByName },
  ]

  const router = new Router()

  router.get("songs", "/songs", (ctx) => {
    const limit = numQueryParam(ctx.query["limit"], 25)

    const res: SongsResponse = { songs: [] }

    for (const { param, fn } of qpfns) {
      if (ctx.query[param] !== undefined) {
        const pattern = queryParam(ctx.query[param])
        res.songs = [...res.songs, ...fn(pattern, limit)]
      }
    }

    ctx.body = res
  })

  return router
}
