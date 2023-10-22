import { MovieWithGenresIds, MovieWithGenresList } from "../interfaces/movies.interface";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWIxMTMzN2ViNmY2NzdhM2I0Y2M3ZmI2N2UyMTY2YSIsInN1YiI6IjY1MWFjMmIwZDg2MWFmMDBjN2UyZjQ4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HJmHiZwk2Xh8mZo7G0Ozy31T4bnYJ-ApLRmBWhHNISw'
  }
};

const API_KEY = "fab11337eb6f677a3b4cc7fb67e2166a";

const getMoviesPaginated = async (link = "", pageParam = 1) => {
  const response = await fetch(link + `&api_key=${API_KEY}` + `&page=${pageParam}`, options)
  const data = await response.json();

  return {
    movies: data.results,
    prevOffSet: pageParam,
    totalPages: data.total_pages
  } as {
    movies: MovieWithGenresIds[],
    prevOffSet: number,
    totalPages: number
  };
}

const getMovieById = async (id: number) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`, options);
  const data = await response.json();

  return data as MovieWithGenresList;
}

const getMoviesByIds = async (ids: number[]) => {
  const movies = await Promise.all(ids.map(id => getMovieById(id)));

  return movies;
}

const getGenres = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`, options);
  const data = await response.json();
  const genres: { [key: number]: string } = {};

  data.genres.map((genre: { id: number, name: string }) => genres[genre.id] = genre.name);

  return genres;
}

export {
  getMoviesPaginated,
  getMovieById,
  getMoviesByIds,
  getGenres
}