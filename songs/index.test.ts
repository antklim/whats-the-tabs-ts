import { SongsRepository, SongsUseCase, Song } from "."
import { InMemorySongsRepository } from "./repo.memory"
import { SongsterrSongsRepository } from "./repo.songsterr"

const songsRepositoryFactory = (): SongsRepository => {
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

describe("Songs use case", () => {
  const repo = songsRepositoryFactory()
  const songsUseCase = new SongsUseCase(repo)

  test.each([
    { pattern: "life", expected: 1 },
    { pattern: "blah", expected: 0 },
  ])("finds $expected songs with '$pattern' in title", ({ pattern, expected }) => {
    const songs = songsUseCase.songsByName(pattern)
    expect(songs).toHaveLength(expected)
  })

  test.each([
    { pattern: "metal", expected: 1 },
    { pattern: "acdc", expected: 0 },
  ])("finds $expected songs with '$pattern' in artist name", ({ pattern, expected }) => {
    const songs = songsUseCase.songsByArtist(pattern)
    expect(songs).toHaveLength(expected)
  })
})
