import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from "@mui/joy/Box";
import Typography from "@mui/material/Typography";
import ReactPlayer from 'react-player';
import { CircularProgress, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const Container = styled(Box)(({ theme }) => ({
  padding: '20px',
  backgroundColor: '#121212',
  color: '#e0e0e0',
  [theme.breakpoints.up('sm')]: {
    padding: '40px',
  },
}));

const Poster = styled('img')(({ theme }) => ({
  width: '150px',
  height: '225px',
  borderRadius: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  marginRight: '20px',
  [theme.breakpoints.up('sm')]: {
    width: '200px',
    height: '300px',
  },
}));

const VideoBox = styled(Box)(({ theme }) => ({
  marginTop: '20px',
  backgroundColor: '#1e1e1e',
  borderRadius: '16px',
  padding: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontWeight: 'bold',
  marginBottom: '10px',
}));

const Overview = styled(Typography)(({ theme }) => ({
  color: '#b0b0b0',
}));

const TrailerText = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontWeight: 'bold',
  marginBottom: '10px',
}));

const MovieDet = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = React.useState(null);
  const [video, setVideo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: import.meta.env.VITE_APP_RAPID_API_KEY,
            language: 'en-US',
          },
        });
        console.log("Movie Response:", movieResponse.data); // Log movie data
        setMovie(movieResponse.data);

        // Fetch movie videos
        const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
          params: {
            api_key: import.meta.env.VITE_APP_RAPID_API_KEY,
            language: 'en-US',
          },
        });
        console.log("Video Response:", videoResponse.data); // Log video data

        // Assuming the first video in the list is the main trailer
        const trailer = videoResponse.data.results.find(video => video.type === 'Trailer');
        setVideo(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null);
      } catch (error) {
        console.error("Error fetching movie details or videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress size={60} color="primary" /></Box>;

  if (!movie) return <Typography color="error">Movie not found</Typography>;

  return (
    <Container>
      {/* Movie Poster and Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px', flexDirection: { xs: 'column', sm: 'row' } }}>
        <Poster 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
        />
        <Box>
          <Title variant="h4" gutterBottom>{movie.title}</Title>
          <Overview variant="body1" paragraph>{movie.overview}</Overview>
          <Button variant="contained" color="primary" size="large" href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener">
            More on IMDb
          </Button>
        </Box>
      </Box>
      
      {/* Video Section */}
      {video ? (
        <VideoBox>
          <TrailerText variant="h6" gutterBottom>Watch the Trailer:</TrailerText>
          <ReactPlayer url={video} controls={true} width="100%" />
        </VideoBox>
      ) : (
        <Typography variant="body1" paragraph sx={{ color: '#b0b0b0' }}>No video available</Typography>
      )}
    </Container>
  );
};

export default MovieDet;
