import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from "@mui/joy/Box";
import Typography from "@mui/material/Typography";
import ReactPlayer from 'react-player';
import { CircularProgress, Button, Chip, Rating, Divider, Grid, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const Container = styled(Box)(({ theme }) => ({
  padding: '20px',
  backgroundColor: '#171D2F',
  color: '#e0e0e0',
  [theme.breakpoints.up('sm')]: {
    padding: '40px',
  },
  position: 'relative',
  minHeight: '100vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: props => `url(https://image.tmdb.org/t/p/original${props.backdrop})`,
}));

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.6)',
  zIndex: 1,
});

const ContentBox = styled(Box)({
  position: 'relative',
  zIndex: 2,
  color: '#e0e0e0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

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
  backgroundColor: '#171D2F',
  borderRadius: '16px',
  padding: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  width: '100%',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontWeight: 'bold',
  marginBottom: '10px',
  textAlign: 'center',
}));

const Overview = styled(Typography)(({ theme }) => ({
  color: '#b0b0b0',
  textAlign: 'center',
}));

const TrailerText = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontWeight: 'bold',
  marginBottom: '10px',
  textAlign: 'center',
}));

const ExtraDetailsBox = styled(Box)(({ theme }) => ({
  marginTop: '20px',
  backgroundColor: '#1b2234',
  padding: '10px',
  borderRadius: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  width: '100%',
}));

const CastBox = styled(Box)(({ theme }) => ({
  marginTop: '20px',
  width: '100%',
}));

const CrewBox = styled(Box)(({ theme }) => ({
  marginTop: '20px',
  width: '100%',
}));

const ReviewsBox = styled(Box)(({ theme }) => ({
  marginTop: '20px',
  width: '100%',
}));

const RecommendationsBox = styled(Box)(({ theme }) => ({
  marginTop: '20px',
  width: '100%',
}));

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const MovieDet = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = React.useState(null);
  const [video, setVideo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [cast, setCast] = React.useState([]);
  const [crew, setCrew] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [recommendations, setRecommendations] = React.useState([]);

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
        setMovie(movieResponse.data);

        // Fetch movie videos
        const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
          params: {
            api_key: import.meta.env.VITE_APP_RAPID_API_KEY,
            language: 'en-US',
          },
        });
        const trailer = videoResponse.data.results.find(video => video.type === 'Trailer');
        setVideo(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null);

        // Fetch movie cast and crew
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          params: {
            api_key: import.meta.env.VITE_APP_RAPID_API_KEY,
            language: 'en-US',
          },
        });
        setCast(creditsResponse.data.cast);
        setCrew(creditsResponse.data.crew);

        // Fetch movie reviews
        const reviewsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          params: {
            api_key: import.meta.env.VITE_APP_RAPID_API_KEY,
            language: 'en-US',
          },
        });
        setReviews(reviewsResponse.data.results.slice(0, 3)); // Limit to 3 reviews

        // Fetch movie recommendations
        const recommendationsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, {
          params: {
            api_key: import.meta.env.VITE_APP_RAPID_API_KEY,
            language: 'en-US',
          },
        });
        setRecommendations(recommendationsResponse.data.results.slice(0, 3)); // Limit to 3 recommendations

      } catch (error) {
        console.error("Error fetching movie details, videos, or reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress size={60} color="primary" /></Box>;

  if (!movie) return <Typography color="error">Movie not found</Typography>;

  return (
    <Container backdrop={movie.backdrop_path}>
      <Overlay />
      <ContentBox>
        {/* Movie Poster and Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Poster 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
          />
          <Box sx={{ flex: 1 }}>
            <Title variant="h4" gutterBottom>{movie.title}</Title>
            <Overview variant="body1" paragraph>{movie.overview}</Overview>
            <Typography variant="body2" paragraph>
              <strong>Release Date:</strong> {movie.release_date}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {movie.genres.map((genre) => (
                <Chip key={genre.id} label={genre.name} variant="outlined" sx={{ color: '#fff', borderColor: '#fff' }} />
              ))}
            </Box>
            <Typography variant="body2" paragraph>
              <strong>Runtime:</strong> {movie.runtime} minutes
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <Rating value={movie.vote_average / 2} readOnly precision={0.1} />
              <Typography variant="body2" sx={{ marginLeft: '8px' }}>{movie.vote_average} / 10</Typography>
            </Box>
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

        {/* Additional Movie Details */}
        <ExtraDetailsBox>
          <Typography variant="h6" gutterBottom>Additional Details</Typography>
          <Divider sx={{ mb: 2, bgcolor: '#444' }} />
          <Typography variant="body1" paragraph>
            <strong>Tagline:</strong> {movie.tagline || 'No tagline available'}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Budget:</strong> {formatCurrency(movie.budget) || 'N/A'}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Revenue:</strong> {formatCurrency(movie.revenue) || 'N/A'}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Production Companies:</strong> {movie.production_companies.map(company => company.name).join(', ')}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Production Countries:</strong> {movie.production_countries.map(country => country.name).join(', ')}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Filming Locations:</strong> {movie.locations || 'No filming locations available'}
          </Typography>
        </ExtraDetailsBox>

        {/* Cast Section */}
        <CastBox>
          <Typography variant="h6" gutterBottom>Cast</Typography>
          <Divider sx={{ mb: 2, bgcolor: '#444' }} />
          <Grid container spacing={2}>
            {cast.slice(0, 10).map(actor => (
              <Grid item xs={6} sm={4} md={3} key={actor.id}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    sx={{ width: 100, height: 100, borderRadius: '50%', mb: 1 }}
                  />
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>{actor.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#b0b0b0', textAlign: 'center' }}>{actor.character}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CastBox>

        {/* Crew Section */}
        <CrewBox>
          <Typography variant="h6" gutterBottom>Crew</Typography>
          <Divider sx={{ mb: 2, bgcolor: '#444' }} />
          <Grid container spacing={2}>
            {crew.filter(member => member.job === 'Director').map(director => (
              <Grid item xs={12} sm={6} md={4} key={director.id}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                    src={`https://image.tmdb.org/t/p/w500${director.profile_path}`}
                    alt={director.name}
                    sx={{ width: 100, height: 100, borderRadius: '50%', mb: 1 }}
                  />
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>{director.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#b0b0b0', textAlign: 'center' }}>{director.job}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CrewBox>

        {/* Reviews Section */}
        <ReviewsBox>
          <Typography variant="h6" gutterBottom>User Reviews</Typography>
          <Divider sx={{ mb: 2, bgcolor: '#444' }} />
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Box key={index} sx={{ marginBottom: '20px' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{review.author}</Typography>
                <Typography variant="body2" paragraph>{review.content}</Typography>
                <Divider sx={{ mb: 2, bgcolor: '#444' }} />
              </Box>
            ))
          ) : (
            <Typography variant="body1" paragraph sx={{ color: '#b0b0b0' }}>No reviews available</Typography>
          )}
        </ReviewsBox>

        {/* Recommended Movies Section */}
        <RecommendationsBox>
          <Typography variant="h6" gutterBottom>Recommended Movies</Typography>
          <Divider sx={{ mb: 2, bgcolor: '#444' }} />
          <Grid container spacing={2}>
            {recommendations.map(rec => (
              <Grid item xs={6} sm={4} md={3} key={rec.id}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Poster src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`} alt={rec.title} />
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>{rec.title}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </RecommendationsBox>
      </ContentBox>
    </Container>
  );
};

export default MovieDet;
