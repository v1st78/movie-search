import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { removeFromSaved } from "../helper";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useQuery } from "react-query";
import { getMoviesByIds } from "../api/movies";
import { useEffect, useState } from "react";
import { MovieWithGenresList } from "../interfaces/movies.interface";

const SavedPage = () => {
  const savedIds = JSON.parse(localStorage.getItem('saved') || '[]');
  const { status: movieStatus, data: moviesData } = useQuery({
    queryKey: ["savedMovies", savedIds],
    queryFn: () => getMoviesByIds(savedIds)
  });
  const [savedMovies, setSavedMovies] = useState(moviesData)

  useEffect(() => {
    if (moviesData) {
      setSavedMovies(moviesData);
    }
  }, [moviesData])

  const handleDeleteFromSaved = (id: number) => {
    if(savedMovies){
      setSavedMovies(savedMovies.filter(movie => movie.id !== id));
    }
    removeFromSaved(id);
  }

  if (savedMovies) {
    return (
      <Grid container>
        {
          savedMovies.map((movie) =>
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Box display="flex" justifyContent="center">
                <SavedMovieCard movieData={movie} handleDelete={handleDeleteFromSaved} />
              </Box>
            </Grid>
          )
        }
      </Grid>
    )
  }
  if (movieStatus == "loading") {
    return (
      <Typography component="p" variant="h5" textAlign="center">Loading...</Typography>
    )
  }
  else {
    return (<Typography component="p" variant="h5" textAlign="center">There is nothing yet</Typography>)
  }
}

export default SavedPage;


const SavedMovieCard = ({ movieData, handleDelete }: {  movieData: MovieWithGenresList , handleDelete: Function }) => {
  const formatedTitle = movieData.title.replace(/ /g, '-').replace(/\?/g, '').replace(/\./g, '').replace(/\,/g, '').replace(/\:/g, '');

  return (

    <Box height="440px" width="250px" position="relative">
      {/* Poster */}
      <Link to={`/details/${formatedTitle}/${movieData.id}`}>
        <Box mb="10px" >
          <img
            width="100%"
            height="350px"
            src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
            style={{ display: 'block', margin: '0', padding: '0' }}
          />
        </Box>
      </Link>

      <Box overflow="hidden">
        <Typography noWrap mb="5px">
          {movieData.title}

          {movieData.release_date && ` (${movieData.release_date.split('-')[0]})`}
        </Typography>
        <Typography noWrap fontSize="14px" color="text.secondary">
          {movieData.genres.map((genre) => `${genre.name} `)}
        </Typography>
      </Box>



      <IconButton onClick={() => {
        handleDelete(movieData.id)
      }} sx={{ position: 'absolute', top: '0', right: '0', bgcolor: 'rgba(0, 0, 0, 0.71)' }} color="primary" disableRipple>
        <BookmarkIcon fontSize="large" />
      </IconButton>



    </Box>


  );
}