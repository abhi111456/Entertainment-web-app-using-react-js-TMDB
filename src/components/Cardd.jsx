import * as React from 'react';
import axios from 'axios';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/joy';

export default function Cardd(props) {
    const [movieList, setMovieList] = React.useState([]);

    const getMovie = () => {
        axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_APP_RAPID_API_KEY}`)
            .then(res => setMovieList(res.data.results))
            .catch(err => console.error('Error fetching movies:', err));
    };

    React.useEffect(() => {
        getMovie();
    }, []);

    return (
        <>
            <Typography 
                level="h2" 
                fontSize="xl" 
                sx={{ mb: 2, color: 'white', ml: '25px', fontSize: '24px', fontWeight: 'bold' }}
            >
                Recommended for you
            </Typography>
          
            <Box 
                sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                    gap: '20px', 
                    margin: '0 25px', 
                    padding: '0' 
                }}
            >
                {movieList.length > 0 ? movieList.map((movie) => (
                    <Card 
                        key={movie.id} 
                        sx={{ 
                            minHeight: '300px', 
                            position: 'relative',
                            overflow: 'hidden', 
                            borderRadius: '16px', 
                            transition: 'transform 0.3s ease', 
                            '&:hover': { transform: 'scale(1.05)' } 
                        }}
                    >
                        <CardCover>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                loading="lazy"
                                alt={movie.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </CardCover>
                        <CardCover
                            sx={{
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 60%)',
                            }}
                        />
                        <CardContent sx={{ 
                            position: 'absolute', 
                            bottom: '0', 
                            width: '100%', 
                            color: 'white', 
                            padding: '8px', 
                            boxSizing: 'border-box',
                            background: 'rgba(0, 0, 0, 0.6)' 
                        }}>
                            <Typography 
                                level="h5" 
                                sx={{ 
                                    mb: 0.5, 
                                    fontSize: '16px', 
                                    fontWeight: 'bold' 
                                }}
                            >
                                {movie.original_name}
                            </Typography>
                            <Typography 
                                sx={{ 
                                    fontSize: '14px', 
                                    color: 'gray.300' 
                                }}
                            >
                                {movie.vote_average}
                            </Typography>
                        </CardContent>
                    </Card>
                )) : (
                    <Typography 
                        level="h4" 
                        fontSize="lg" 
                        sx={{ color: 'white', marginLeft: '5px' }}
                    >
                        Loading...
                    </Typography>
                )}
            </Box>
        </>
    );
}
