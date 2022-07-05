import { URL } from "node:url"
import { Song, SongsRepository } from "."

export class SongsterrSongsRepository implements SongsRepository {
  baseUrl: URL

  constructor(rawUrl: string) {
    this.baseUrl = new URL(rawUrl)
  }

  songsByName = (pattern: string, limit = 10) => {
    const songs: Song[] = []
    return songs
  }

  songsByArtist = (pattern: string, limit = 10) => {
    const songs: Song[] = []
    return songs
  }
}
