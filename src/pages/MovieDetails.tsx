import { useTheme } from "@emotion/react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { addToSaved, removeFromSaved } from "../helper";
import { useQuery } from "react-query";
import { getMovieById } from "../api/movies";

const MovieDetails = () => {
  const { id } = useParams();
  const savedIds = JSON.parse(localStorage.getItem('saved') || '[]');
  const theme: any = useTheme();
  const {status, data: movieData } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieById(Number(id))
  })
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [isSaved, setIsSaved] = useState(false);


  useEffect(() => {
    setIsSaved(savedIds.includes(Number(id)));
  }, [id]);

  if(status == 'loading'){
    return(<Typography component="p" variant="h5" textAlign="center">Loading...</Typography>)
  }

  if (movieData) {
    return (
      <Box display="flex" pt="20px" pb='40px' flexDirection={isMdScreen ? 'column' : 'row'} alignItems={isMdScreen ? 'center' : 'start'}>
        <Box width="60%" mb={isMdScreen ? '30px' : '0px'}>
          <img width="100%" src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`} />
        </Box>


        <Box pl={isMdScreen ? '20px' : '40px'} pr={isMdScreen ? '20px' : '0px'} maxWidth="500px">
          <Typography fontWeight="700" variant="h4" mb="15px" >{movieData.title}</Typography>

          <Typography mb="15px" color="text.secondary">Data Release: {moment(movieData.release_date).format('LL')}</Typography>

          {
            movieData.tagline && <Typography variant="h5" color="text.secondary" mb="10px">"{movieData.tagline}"</Typography>
          }

          <Typography variant="h6" color="text.secondary" mb="10px">
            {movieData.genres.map((genre, i) => `${genre.name} ${i < movieData.genres.length - 1 ? '|' : ''} `)}
          </Typography>

          <Typography maxWidth="500px" mb="20px">
            {movieData.overview}
          </Typography>

          {
            isSaved ?
              <Button onClick={() => {
                removeFromSaved(movieData.id);
                setIsSaved(!isSaved);
              }} startIcon={<BookmarkIcon />} fullWidth variant="contained" color="inherit" sx={{ color: 'black' }}>Saved</Button> :

              <Button onClick={() => {
                addToSaved(movieData.id);
                setIsSaved(!isSaved);
              }} startIcon={<BookmarkBorderIcon />} fullWidth variant="contained">Save</Button>

          }

        </Box>
      </Box>
    )
  }
}
export default MovieDetails