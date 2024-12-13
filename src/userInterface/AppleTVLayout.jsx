import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Tabs, Tab, Box } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Container = styled.div`
  padding: 20px;
  color: white;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const MovieCarousel = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 22px;
  padding-top: 10px;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MovieCard = styled.div`
  position: relative;
  min-width: 200px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.7);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
`;

const MovieInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${MovieCard}:hover & {
    opacity: 1;
  }
`;

const MovieTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const MovieRating = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #ffcc00;
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${MovieCard}:hover & {
    opacity: 1;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledTabs = styled(Tabs)`

  background-color: #2E3B4E;
  color:white;
  font-size: 18px;
  font-weight: 600;
  
  border-radius: 8px;

  .MuiTabs-flexContainer {
    flex-wrap: wrap; 
  }
`;

const StyledTab = styled(Tab)`
  font-size: 16px;
  font-weight: 600;
  text-transform: none;
  color: blue;
  padding: 12px 24px;

  &.Mui-selected {
    color: black; 
    background-color: rgba(255, 0, 0, 0.1); 
  }

  &:hover {
    color: #ff0000; 
    background-color: rgba(255, 0, 0, 0.1); 
  }
`;

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: block;
    overflow-x: auto;
  }
`;

const DesktopContainer = styled.div`
  display: block;

  @media (max-width: 600px) {
    display: none;
  }
`;

export default function AppleTVLayout() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("streaming");
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const fetchMovies = async (category) => {
    setLoading(true);
    try {
      const endpoint = {
        streaming: "https://api.themoviedb.org/3/trending/movie/week",
        on_tv: "https://api.themoviedb.org/3/tv/popular",
        for_rent: "https://api.themoviedb.org/3/movie/upcoming",
        in_theater: "https://api.themoviedb.org/3/movie/now_playing",
      }[category];

      const response = await axios.get(endpoint, {
        params: {
          api_key: import.meta.env.VITE_APP_RAPID_API_KEY,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(category);
  }, [category]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({
          left: 200,
          behavior: "smooth",
        });
      }
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress color="primary" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Title>Movie Categories</Title>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <DesktopContainer>
          <StyledTabs
            value={category}
            onChange={handleCategoryChange}
            aria-label="movie categories"
          >
            <StyledTab value="streaming" label="Streaming" />
            <StyledTab value="on_tv" label="On TV" />
            <StyledTab value="for_rent" label="For Rent" />
            <StyledTab value="in_theater" label="In Theater" />
          </StyledTabs>
        </DesktopContainer>
        <MobileContainer>
          <StyledTabs
            value={category}
            onChange={handleCategoryChange}
            aria-label="movie categories"
            sx={{ overflowX: 'auto' }}
          >
            <StyledTab value="streaming" label="Streaming" />
            <StyledTab value="on_tv" label="On TV" />
            <StyledTab value="for_rent" label="For Rent" />
            <StyledTab value="in_theater" label="In Theater" />
          </StyledTabs>
        </MobileContainer>
      </Box>
      <MovieCarousel ref={carouselRef}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            <MoviePoster
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieRating>Rating: {movie.vote_average}</MovieRating>
            </MovieInfo>
            <PlayButton>
              <YouTubeIcon
                fontSize="large"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  backgroundColor: "#FF0000",
                  borderRadius: "20%",
                  padding: "8px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(255,0,0,0.7)",
                  },
                }}
              />
            </PlayButton>
          </MovieCard>
        ))}
      </MovieCarousel>
    </Container>
  );
}
