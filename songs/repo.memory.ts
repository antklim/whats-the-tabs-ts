import { Song, SongsRepository } from "."

export class InMemorySongsRepository implements SongsRepository {
  songs: Song[]

  constructor(songs: Song[] = []) {
    this.songs = [...songs]
  }

  addSong(song: Song) {
    this.songs.push(song)
  }

  addSongs(songs: Song[]) {
    this.songs = [...this.songs, ...songs]
  }

  songsByName(pattern: string, limit = 10) {
    const re = new RegExp(pattern, "i")
    return this.songs.filter(({ title }) => re.test(title)).slice(0, limit)
  }

  songsByArtist(pattern: string, limit = 10) {
    const re = new RegExp(pattern, "i")
    return this.songs.filter(({ artist }) => re.test(artist)).slice(0, limit)
  }

  purge() {
    this.songs = []
  }
}
