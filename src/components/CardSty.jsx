import * as React from 'react';
import axios from 'axios';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import debounce from 'lodash/debounce';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IconButton from '@mui/joy/IconButton';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import AspectRatio from '@mui/joy/AspectRatio';
import { PlayArrow } from '@mui/icons-material';

export default function CardSty(props) {
    const [movieList, setMovieList] = React.useState([]);
    const [selectedMovie, setSelectedMovie] = React.useState(null);
    const containerRef = React.useRef(null);

    const getMovie = () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_APP_RAPID_API_KEY}`)
            .then(res => setMovieList(res.data.results))
            .catch(err => console.error('Error fetching movies:', err));
    };

    const getMovieVideo = (movieId) => {
        return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_APP_RAPID_API_KEY}`)
            .then(res => res.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube'))
            .catch(err => console.error('Error fetching movie video:', err));
    };

    React.useEffect(() => {
        getMovie();
    }, []);

    const handleScroll = debounce((event) => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: event.deltaY > 0 ? 100 : -100,
                behavior: 'smooth'
            });
        }
    }, 50);

    const handleKeyDown = (event) => {
        if (containerRef.current) {
            if (event.key === 'ArrowRight') {
                containerRef.current.scrollBy({
                    left: 100,
                    behavior: 'smooth'
                });
            } else if (event.key === 'ArrowLeft') {
                containerRef.current.scrollBy({
                    left: -100,
                    behavior: 'smooth'
                });
            }
        }
    };

    React.useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleScroll);
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            if (container) {
                container.removeEventListener('wheel', handleScroll);
            }
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleCardClick = async (movie) => {
        const video = await getMovieVideo(movie.id);
        if (video) {
            setSelectedMovie({
                title: movie.title,
                videoUrl: `https://www.youtube.com/embed/${video.key}`
            });
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
                sx={{ color: 'white', ml: '25px', fontSize: '24px', fontWeight: 'bold' }}
            >
                Latest
            </Typography>
            <div 
                ref={containerRef}
                style={{ 
                    display: 'flex', 
                    overflowX: 'auto', 
                    padding: '10px', 
                    gap: '10px', 
                    cursor: 'grab', 
                    scrollBehavior: 'smooth', 
                    msOverflowStyle: 'none', 
                    scrollbarWidth: 'none' 
                }}
                className="hide-scrollbar"
            >
                {movieList.length > 0 ? movieList.map((movie) => (
                    <Card 
                        key={movie.id} 
                        sx={{ minHeight: '200px', width: 390, flex: '0 0 auto' }}
                        onClick={() => handleCardClick(movie)}
                    >
                        <CardCover>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                loading="lazy"
                                alt={movie.title}
                            />
                            <IconButton
                                aria-label="add to watchlist"
                                sx={{
                                    position: 'absolute',
                                    top: '0px',
                                    right: '0px',
                                    color: 'white',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.7)',
                                    }
                                }}
                            >
                                <BookmarkBorderIcon/>
                            </IconButton>
                            <IconButton
                                aria-label="play video"
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: 'white',
                                    backgroundColor: '#FF0000',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.7)',
                                    }
                                }}
                             
                            >
                                <PlayArrow />
                            </IconButton>

                        </CardCover>
                        <CardCover
                            sx={{
                                background:
                                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                            }}
                        />
                        <CardContent sx={{ justifyContent: 'flex-end' }}>
                            <Typography level="title-lg" textColor="#fff">
                                {movie.title}
                            </Typography>
                            <Typography
                                startDecorator={<LocationOnRoundedIcon />}
                                textColor="neutral.300"
                            >
                                {movie.release_date}
                            </Typography>
                        </CardContent>
                        
                    </Card>
                )) : <Typography level="h4" fontSize="lg" sx={{ color: 'white', marginLeft: '5px' }}>Loading...</Typography>}
            </div>
            {selectedMovie && (
                <Modal open={Boolean(selectedMovie)} onClose={handleClose}>
                    <ModalDialog>
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
                    </ModalDialog>
                </Modal>
            )}
            <style jsx>{`
                .hide-scrollbar {
                    -ms-overflow-style: none;  /* Internet Explorer 10+ */
                    scrollbar-width: none;  /* Firefox */
                }

                .hide-scrollbar::-webkit-scrollbar { 
                    display: none;  /* Safari and Chrome */
                }
            `}</style>
        </>
    );
}
