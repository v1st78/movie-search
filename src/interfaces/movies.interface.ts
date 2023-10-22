export interface MovieWithGenresIds {
  poster_path: string | undefined,
  id: number,
  title: string,
  tagline: string | undefined,
  overview: string,
  release_date: string,
  genre_ids: number[]
}

export type MovieWithGenresList = {
  poster_path: string | undefined,
  id: number,
  title: string,
  tagline: string | undefined,
  overview: string,
  release_date: string,
  genre_ids: number[],
  genres: { name: string, id: number }[],
};
