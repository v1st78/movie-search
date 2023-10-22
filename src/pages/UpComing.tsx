import { useInfiniteQuery, useQuery } from "react-query"
import { getGenres, getMoviesPaginated } from "../api/movies"
import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useRef } from "react";
import { MovieWithGenresIds } from "../interfaces/movies.interface";
import MovieCard from "../components/MovieCard";

const UpComing = () => {
  const { data: genres, status: genreStatus } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres
  })

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['upComing'],
    queryFn: ({ pageParam = 1 }) => getMoviesPaginated(`https://api.themoviedb.org/3/movie/upcoming?language=en-US`, pageParam),
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

  if (status == 'loading' || genreStatus == 'loading') {
    return (<Typography component="p" variant="h5" textAlign="center">Loading...</Typography>)
  }

  else if(genres){
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
      </>)
  }
}
export default UpComing