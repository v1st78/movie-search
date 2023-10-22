import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { addToSaved, removeFromSaved } from "../helper";
import { useEffect, useState } from "react";
import { MovieWithGenresIds } from "../interfaces/movies.interface";

const MovieCard = ({ movieData, genres }: { movieData: MovieWithGenresIds, genres: {[key: number]: string  }}) => {
  const formatedTitle = movieData.title.replace(/ /g, '-').replace(/\?/g, '').replace(/\./g, '').replace(/\,/g, '').replace(/\:/g, '');

  if (!movieData.poster_path) return null;

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(JSON.parse(localStorage.getItem('saved') || '[]').includes(movieData.id));
  }, [])

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

          {` (${movieData.release_date.split('-')[0]})`}
        </Typography>
        <Typography noWrap fontSize="14px" color="text.secondary">
          {movieData.genre_ids.map(id => `${genres[id]} `)}
        </Typography>
      </Box>

      {
        isSaved ?

          <IconButton onClick={() => {
            removeFromSaved(movieData.id);

            setIsSaved(!isSaved);
          }} sx={{ position: 'absolute', top: '0', right: '0', bgcolor: 'rgba(0, 0, 0, 0.71)' }} color="primary" disableRipple>
            <BookmarkIcon fontSize="large" />
          </IconButton>

          :

          <IconButton onClick={() => {
            addToSaved(movieData.id)

            setIsSaved(!isSaved);
          }} sx={{ position: 'absolute', top: '0', right: '0', bgcolor: 'rgba(0, 0, 0, 0.71)' }} color="primary" disableRipple>
            <BookmarkBorderIcon fontSize="large" />
          </IconButton>
      }

    </Box>


  );
}

export default MovieCard;