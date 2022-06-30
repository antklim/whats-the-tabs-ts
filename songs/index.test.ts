import { SongsUseCase } from "."
import { songsRepositoryFactory } from "./test.utils"

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
