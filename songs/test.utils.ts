import { Song, SongsRepository } from "."
import { InMemorySongsRepository } from "./repo.memory"
import { SongsterrSongsRepository } from "./repo.songsterr"

export function songsRepositoryFactory(): SongsRepository {
  if (!process.env.SONGSTERR_API_URL) {
    const songs: Song[] = [
      { id: 1, artist: "Bon Jovi", title: "It's My Life" },
      { id: 2, artist: "Metallica", title: "Orion" },
      { id: 3, artist: "AC/DC", title: "Thunderstruck" },
    ]

    return new InMemorySongsRepository(songs)
  }

  return new SongsterrSongsRepository(process.env.SONGSTERR_API_URL)
}
