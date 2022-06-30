// This is songs use-case. It's responsible for business logic of getting songs.

export interface Song {
  id: number
  artist: string
  title: string
}

// eslint-disable-next-line no-unused-vars
type getSongsFn = (pattern: string, limit?: number) => Song[]

export interface SongsRepository {
  songsByName: getSongsFn
  songsByArtist: getSongsFn
}

export class SongsUseCase {
  repo: SongsRepository

  constructor(repo: SongsRepository) {
    this.repo = repo
  }

  songsByName(name: string, limit?: number) {
    return this.repo.songsByName(name, limit)
  }

  songsByArtist(name: string, limit?: number) {
    return this.repo.songsByArtist(name, limit)
  }
}
