import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom"
import MovieCard from "../components/MovieCard";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { getGenres, getMoviesPaginated } from "../api/movies";
import { MovieWithGenresIds } from "../interfaces/movies.interface.tsx";

const SearchResults = () => {
  const { query } = useParams();
  const queryClient = useQueryClient();

  const { data: genres, status: genreStatus } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres
  })

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['movies', query],
    queryFn: ({ pageParam = 1 }) => getMoviesPaginated(`https://api.themoviedb.org/3/search/movie?query=${query}`, pageParam),
    getNextPageParam: lastPage => (lastPage.prevOffSet >= lastPage.totalPages ? false : lastPage.prevOffSet + 1)
  })

  const moviesList = data?.pages.reduce((acc: MovieWithGenresIds[], page) => {
    return [...acc, ...page.movies]
  }, []) || [];

  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useCallback((node: any) => {
    if (status === 'loading') return;

    if (intObserver.current) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (node) intObserver.current.observe(node);
  }, [status, hasNextPage]);


  useEffect(() => {
    queryClient.invalidateQueries('movies');
  }, [query]);

  if (status == 'loading' || genreStatus == 'loading') {
    return (<Typography component="p" variant="h5" textAlign="center">Loading...</Typography>)
  }

  if (moviesList.length == 0) {
    return (
      <Box pt="40px">
        <Typography variant="h3" textAlign="center">No results</Typography>
      </Box>
    )
  }

  else if (genres) {
    return (
      <>
        <Grid container>
          {
            moviesList.map((movie, index) => movie.poster_path ?
              <Grid ref={index <= moviesList.length ? lastMovieRef : null} item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <Box display="flex" justifyContent="center">
                  <MovieCard movieData={movie} genres={genres} />
                </Box>
              </Grid>
              : null
            )
          }

        </Grid>
      </>
    )
  }

}
export default SearchResults



