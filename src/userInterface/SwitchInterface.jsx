import * as React from 'react';
import axios from 'axios';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import Typography from '@mui/joy/Typography';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IconButton from '@mui/joy/IconButton';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import AspectRatio from '@mui/joy/AspectRatio';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import debounce from 'lodash/debounce';

export default function SwitchInterface(props) {
    const [movieList, setMovieList] = React.useState([]);
    const [showTrending, setShowTrending] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const containerRef = React.useRef(null);
    const [selectedMovie, setSelectedMovie] = React.useState(null);

    const getMovies = (type) => {
        setLoading(true);
        const endpoint = type === 'trending' 
            ? `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_APP_RAPID_API_KEY}`
            : `https://api.themoviedb.org/3/tv/airing_today?api_key=${import.meta.env.VITE_APP_RAPID_API_KEY}`;
        
        axios.get(endpoint)
            .then(res => {
                setMovieList(res.data.results);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching movies');
                setLoading(false);
                console.error('Error fetching movies:', err);
            });
    };

    React.useEffect(() => {
        getMovies(showTrending ? 'trending' : 'today');
    }, [showTrending]);

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

    const handlePlayClick = async (movie) => {
        const videoUrl = await getMovieVideo(movie.id);
        if (videoUrl) {
            setSelectedMovie({
                title: showTrending ? movie.title : movie.name,
                videoUrl: videoUrl
            });
        } else {
            console.log('No trailer available for this movie.');
        }
    };

    const handleClose = () => {
        setSelectedMovie(null);
    };

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            if (containerRef.current) {
                containerRef.current.scrollBy({
                    left: 100,
                    behavior: 'smooth'
                });
            }
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '25px', marginTop: '20px' }}>
                <Typography 
                    level="h2" 
                    fontSize="xl" 
                    sx={{ color: 'white', fontSize: '28px', fontWeight: 'bold', marginRight: '20px', padding: '10px' }}
                >
                    Latest
                </Typography>
                <ToggleButtonGroup
                    value={showTrending ? 'trending' : 'today'}
                    exclusive
                    onChange={(event, value) => setShowTrending(value === 'trending')}
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '25px',
                    }}
                >
                    <ToggleButton 
                        value="today" 
                        sx={{ 
                            color: showTrending ? 'black' : 'white',
                            backgroundColor: showTrending ? '#c4bd9d' : '#c4bd9d',
                            borderRadius: '25px 0 0 25px',
                            '&:hover': {
                                backgroundColor: showTrending ? '#575449' : '#575449',
                            },
                        }}
                    >
                        Today
                    </ToggleButton>
                    <ToggleButton 
                        value="trending" 
                        sx={{ 
                            color: showTrending ? 'white' : 'black',
                            backgroundColor: showTrending ? '#f50057' : 'white',
                            borderRadius: '0 25px 25px 0',
                            '&:hover': {
                                backgroundColor: showTrending ? '#d4004f' : 'lightgray',
                            },
                        }}
                    >
                        Trending
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
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
                    scrollbarWidth: 'none',
                    whiteSpace: 'nowrap',
                    marginTop: '10px',
                    marginBottom: '20px',
                }}
                className="hide-scrollbar"
            >
                {movieList.length > 0 ? movieList.map((movie) => (
                    <Card key={movie.id} sx={{ minHeight: '200px', width: 390, flex: '0 0 auto', position: 'relative' }}>
                        <CardCover>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${showTrending ? movie.poster_path : movie.backdrop_path}`}
                                loading="lazy"
                                alt={showTrending ? movie.title : movie.name}
                            />
                            <IconButton
                                aria-label="add to watchlist"
                                sx={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    color: 'white',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.7)',
                                    }
                                }}
                            >
                                <BookmarkBorderIcon />
                            </IconButton>
                            <YouTubeIcon
                                fontSize="large"
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    backgroundColor: '#FF0000',
                                    transform: 'translate(-50%, -50%)',
                                    color: 'white',
                                    padding:'8px',
                                    borderRadius: '20%',
                                    visibility: 'visible',
                                    '&:hover': {
                                        color: '#f50057',
                                        cursor: 'pointer',
                                    }
                                }}
                                onClick={() => handlePlayClick(movie)}
                            />
                        </CardCover>
                    </Card>
                )) : loading ? (
                    <Typography level="h4" fontSize="lg" sx={{ color: 'white', marginLeft: '5px' }}>Loading...</Typography>
                ) : (
                    <Typography level="h4" fontSize="lg" sx={{ color: 'white', marginLeft: '5px' }}>No movies found</Typography>
                )}
            </div>

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
