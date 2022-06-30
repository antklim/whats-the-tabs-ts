import { Song } from "./songs"
import { InMemorySongsRepository } from "./repo.memory"

const song1: Song = {
  id: 1,
  artist: "Bon Jovi",
  title: "It's My Life",
}

const song2: Song = {
  id: 2,
  artist: "Metallica",
  title: "Orion",
}

const song3: Song = {
  id: 3,
  artist: "AC/DC",
  title: "Thunderstruck",
}

describe("In memory songs repository", () => {
  test("adds a song to a repository", () => {
    const repo = new InMemorySongsRepository()

    expect(repo.songs).toHaveLength(0)

    repo.addSong(song1)

    expect(repo.songs).toHaveLength(1)
    expect(repo.songs[0]).toEqual(song1)
  })

  test("adds songs to a repository", () => {
    const repo = new InMemorySongsRepository([song1])

    expect(repo.songs).toHaveLength(1)

    repo.addSongs([song2, song3])

    expect(repo.songs).toHaveLength(3)
  })

  test("gets songs by song name pattern", () => {
    const repo = new InMemorySongsRepository([song1, song2, song3])

    const songs = repo.songsByName("life")

    expect(songs).toHaveLength(1)
    expect(songs[0]).toEqual(song1)
  })

  test("gets songs by artist name pattern", () => {
    const repo = new InMemorySongsRepository([song1, song2, song3])

    const songs = repo.songsByArtist("Metal")

    expect(songs).toHaveLength(1)
    expect(songs[0]).toEqual(song2)
  })

  test("purges songs in repository", () => {
    const repo = new InMemorySongsRepository([song1, song2, song3])

    expect(repo.songs).toHaveLength(3)

    repo.purge()

    expect(repo.songs).toHaveLength(0)
  })
})
