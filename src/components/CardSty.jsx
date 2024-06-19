import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

export default function CardSty() {
    const [movieList, setMovieList] = React.useState([]);

    const getMovie = () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_APP_RAPID_API_KEY}`)
            .then(res => res.json())
            .then(json => setMovieList(json.results));
    };

    React.useEffect(() => {
        getMovie();
    }, []);

    console.log(movieList);

    return (
        <>
            <Typography 
                level="h2" 
                fontSize="xl" 
                sx={{  color: 'white', ml: '25px', fontSize: '24px', fontWeight: 'bold' }}
            >
                Trending
            </Typography>
            <div style={{ display: 'flex', overflowX: 'auto', padding: '10px', gap: '10px' }}>
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
        </>
    );
}
