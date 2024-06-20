import * as React from 'react';
import axios from 'axios';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import debounce from 'lodash/debounce';

export default function CardSty(props) {
    const [movieList, setMovieList] = React.useState([]);
    const containerRef = React.useRef(null);

    const getMovie = () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_APP_RAPID_API_KEY}`)
            .then(res => setMovieList(res.data.results))
            .catch(err => console.error('Error fetching movies:', err));
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

    return (
        <>
            <Typography 
                level="h2" 
                fontSize="xl" 
                sx={{ color: 'white', ml: '25px', fontSize: '24px', fontWeight: 'bold' }}
            >
                Trending
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
                    <Card key={movie.id} sx={{ minHeight: '180px', width: 360, flex: '0 0 auto' }}>
                        <CardCover>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                loading="lazy"
                                alt={movie.title}
                            />
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
