import Debug from "debug"
import { SongsRepository } from "."
import { InMemorySongsRepository } from "./repo.memory"
import { SongsterrSongsRepository } from "./repo.songsterr"

const debug = Debug("wtt:songs:repo")

export function songsRepositoryFactory(): SongsRepository {
  if (!process.env.SONGSTERR_API_URL) {
    debug("Using in memory repository")

    const repo = new InMemorySongsRepository()

    if (process.env.LOAD_SONGS_FROM) {
      debug(`Loading songs from ${process.env.LOAD_SONGS_FROM} ...`)
      repo.load(process.env.LOAD_SONGS_FROM)
    }

    return repo
  }

  return new SongsterrSongsRepository(process.env.SONGSTERR_API_URL)
}
