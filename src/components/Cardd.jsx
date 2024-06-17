import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import IconButton from '@mui/joy/IconButton';
export default function Cardd() {
    const [movieList, setMovieList] = React.useState([]);

    const getMovie = () => {
        fetch("https://api.themoviedb.org/3/discover/movie?")
            .then(res => res.json())
            .then(json => setMovieList(json.results));
    };

    React.useEffect(() => {
        getMovie();
    }, []);

    return (
        <>
            <Typography level="h2" fontSize="xl" sx={{ mb: 2, color: 'white', marginLeft: '25px', fontSize: '18px' }}>
               Recommended for you
            </Typography>
          
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px' }}>
                {movieList.length > 0 ? movieList.map((movie) => (
                    <Card key={movie.id} sx={{ minHeight: '200px', width: 320 }}>
                    
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
