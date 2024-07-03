import * as React from 'react';
import axios from 'axios';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IconButton from '@mui/joy/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import debounce from 'lodash/debounce';

export default function SwitchInterface(props) {
    const [movieList, setMovieList] = React.useState([]);
    const [showTrending, setShowTrending] = React.useState(false);
    const containerRef = React.useRef(null);

    const getMovies = (type) => {
        const endpoint = type === 'trending' 
            ? `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_APP_RAPID_API_KEY}`
            : `https://api.themoviedb.org/3/tv/airing_today?api_key=${import.meta.env.VITE_APP_RAPID_API_KEY}`;
        
        axios.get(endpoint)
            .then(res => setMovieList(res.data.results))
            .catch(err => console.error('Error fetching movies:', err));
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
                <FormControlLabel
                    control={<Switch 
                        checked={showTrending} 
                        onChange={() => setShowTrending(!showTrending)} 
                        sx={{
                            '& .MuiSwitch-thumb': {
                                backgroundColor: showTrending ? '#f50057' : 'blue',
                                width: 25,
                                height: 26,
                                '&:hover': {
                                    backgroundColor: showTrending ? '#f50057' : 'white',
                                }
                            },
                            '& .MuiSwitch-track': {
                                backgroundColor: showTrending ? '#f50057' : 'white',
                                opacity: 1,
                                height: 25,
                                width:48,
                                borderRadius: 7,
                            },
                        

                            
                        }}
                    />}
                    label={showTrending ? 'Trending' : 'Today'}
                    sx={{ color: 'white', 
                        '& .MuiFormControlLabel-label': {
                            fontSize: '20px',
                            fontWeight: 'bold',
                        },
                     }}
                />
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
                    <Card key={movie.id} sx={{ minHeight: '200px', width: 390, flex: '0 0 auto' }}>
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
                        </CardCover>
                        <CardCover
                            sx={{
                                background:
                                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                            }}
                        />
                        <CardContent sx={{ justifyContent: 'flex-end' }}>
                            <Typography level="title-lg" textColor="#fff">
                                {showTrending ? movie.title : movie.name}
                            </Typography>
                            <Typography
                                startDecorator={<LocationOnRoundedIcon />}
                                textColor="neutral.300"
                            >
                                {showTrending ? movie.release_date : movie.first_air_date}
                            </Typography>
                        </CardContent>
                    </Card>
                )) : <Typography level="h4" fontSize="lg" sx={{ color: 'white', marginLeft: '5px' }}>Loading...</Typography>}
            </div>
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
