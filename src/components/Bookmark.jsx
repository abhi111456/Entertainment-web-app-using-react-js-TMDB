import * as React from 'react';
import axios from 'axios';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/joy';
import YouTubeIcon from '@mui/icons-material/YouTube'; // Import YouTube icon
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import AspectRatio from '@mui/joy/AspectRatio';

export default function Bookmark() {
    const [movieList, setMovieList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [selectedMovie, setSelectedMovie] = React.useState(null);

    const getMovie = async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_APP_RAPID_API_KEY}`);
            setMovieList(res.data.results);
        } catch (err) {
            setError('Error fetching movies');
            console.error('Error fetching movies:', err);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getMovie();
    }, []);

    const getMovieVideo = async (movieId) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_APP_RAPID_API_KEY}`);
            const video = response.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            return video ? `https://www.youtube.com/embed/${video.key}` : null;
        } catch (error) {
            console.error('Error fetching movie video:', error);
            return null;
        }
    };

    const handleCardClick = async (movie) => {
        const videoUrl = await getMovieVideo(movie.id);
        if (videoUrl) {
            setSelectedMovie({
                title: movie.title,
                videoUrl: videoUrl
            });
        } else {
            console.log('No trailer available for this movie.');
        }
    };

    const handleClose = () => {
        setSelectedMovie(null);
    };

    return (
        <>
            <Typography
                level="h2"
                fontSize="xl"
                sx={{ mb: 2, color: 'white', ml: '25px', fontSize: '24px', fontWeight: 'bold' }}
            >
                Bookmark
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', margin: '0 25px', padding: '0' }}>
                {movieList.length > 0 ? movieList.map((movie) => (
                    <Card key={movie.id} sx={{ minHeight: '300px', maxHeight: '400px', position: 'relative', overflow: 'hidden', borderRadius: '16px', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
                        <CardCover>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} loading="lazy" alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <YouTubeIcon
                                fontSize="large"
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: 'white',
                                    backgroundColor: '#FF0000',
                                    borderRadius: '20%',
                                    padding: '8px', // Matching padding
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,0,0,0.7)',
                                    }
                                }}
                                onClick={() => handleCardClick(movie)}
                            />
                        </CardCover>
                        <CardContent sx={{ position: 'absolute', bottom: '0', left: '0', width: '100%', color: 'white', padding: '8px', boxSizing: 'border-box', background: 'rgba(0, 0, 0, 0.6)' }}>
                            <Typography level="h5" sx={{ mb: 0.5, fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>{movie.original_title}</Typography>
                            <Typography sx={{ fontSize: '14px', color: 'gray.300', textAlign: 'center' }}>{movie.release_date}</Typography>
                        </CardContent>
                    </Card>
                )) : (
                    <Typography level="h4" fontSize="lg" sx={{ color: 'text.primary', marginLeft: '5px' }}>No movies found</Typography>
                )}
            </Box>
            
            <Modal open={Boolean(selectedMovie)} onClose={handleClose}>
                <ModalDialog>
                    {selectedMovie && (
                        <React.Fragment>
                            <Typography level="h2" sx={{ mb: 2 }}>{selectedMovie.title}</Typography>
                            <AspectRatio ratio="16/9">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={selectedMovie.videoUrl}
                                    title={selectedMovie.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </AspectRatio>
                        </React.Fragment>
                    )}
                </ModalDialog>
            </Modal>
        </>
    );
}
