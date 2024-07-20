import * as React from "react";
import Box from "@mui/joy/Box";
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Dashboard, LocalMovies } from "@mui/icons-material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Tooltip, InputBase, IconButton, Popover, Typography, CircularProgress, Drawer, List, ListItem, ListItemButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { debounce } from "lodash";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  // Debounced search function
  const debouncedSearch = React.useCallback(
    debounce(async (query) => {
      console.log("Searching for:", query); // Debugging log
      if (query.trim() === "") {
        setMovies([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: import.meta.env.VITE_APP_RAPID_API_KEY,
            query: query,
            language: 'en-US',
            page: 1,
            include_adult: false,
          },
        });
        if (response.status === 200) {
          setMovies(response.data.results);
        } else {
          console.error("Failed to fetch search results:", response.status);
        }
      } catch (error) {
        console.error("Error searching movies:", error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  // Handle input change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission behavior
      console.log("Enter key pressed, searching for:", searchTerm); // Debugging log
      debouncedSearch(searchTerm); // Trigger search immediately
    }
  };

  // Open/Close Popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'search-popover' : undefined;

  // Handle movie click
  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
    handleClose();
  };

  // Toggle mobile menu
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        <ListItem>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <Dashboard sx={{ color: 'gray' }} />
              <Typography variant="body2" sx={{ marginLeft: '16px' }}>Dashboard</Typography>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link to='/movie' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <LocalMovies sx={{ color: 'gray' }} />
              <Typography variant="body2" sx={{ marginLeft: '16px' }}>Movies</Typography>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link to='/latest' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <LiveTvIcon sx={{ color: 'gray' }} />
              <Typography variant="body2" sx={{ marginLeft: '16px' }}>Latest</Typography>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link to='/bookmark' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <BookmarkIcon sx={{ color: 'gray' }} />
              <Typography variant="body2" sx={{ marginLeft: '16px' }}>Bookmarks</Typography>
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', height: '60px',
      backgroundColor: '#171D2F', color: 'skyblue', padding: '0 16px', boxSizing: 'border-box', borderRadius: '20px'
    }}>
      <MovieCreationIcon sx={{ fontSize: '30px', color: 'red' }} />

      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, marginLeft: '16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#2E3B4E', borderRadius: '20px', padding: '0 8px', flexGrow: 1, marginRight: '16px' }}>
          <InputBase
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            sx={{ color: 'white', flex: 1 }}
          />
          <IconButton onClick={handleClick} sx={{ padding: '8px', color: '#FF9800' }}>
            <SearchIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </Box>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{ maxWidth: '400px' }}
        >
          <Box sx={{ width: '300px', padding: '8px', maxHeight: '400px', overflowY: 'auto' }}>
            {loading ? (
              <CircularProgress size={24} />
            ) : movies.length > 0 ? (
              movies.map((movie) => (
                <Box key={movie.id} sx={{ padding: '8px', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleMovieClick(movie.id)}>
                  <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} style={{ width: '50px', height: '75px', marginRight: '8px' }} />
                  <Typography variant="body2">{movie.title}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ padding: '1px' }}>No results found</Typography>
            )}
          </Box>
        </Popover>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: '16px' }}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <IconButton>
              <Dashboard sx={{ color: 'gray' }} />
            </IconButton>
          </Link>
          <Link to='/movie' style={{ textDecoration: 'none' }}>
            <IconButton>
              <LocalMovies sx={{ color: 'gray' }} />
            </IconButton>
          </Link>
          <Link to='/latest' style={{ textDecoration: 'none' }}>
            <IconButton>
              <LiveTvIcon sx={{ color: 'gray' }} />
            </IconButton>
          </Link>
          <Link to='/bookmark' style={{ textDecoration: 'none' }}>
            <IconButton>
              <BookmarkIcon sx={{ color: 'gray' }} />
            </IconButton>
          </Link>
        </Box>

        <Tooltip title="Profile" arrow>
          <Avatar alt="Profile" src="https://mui.com/static/images/avatar/1.jpg" sx={{ cursor: 'pointer' }} />
        </Tooltip>

        <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon sx={{ color: 'gray' }} />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
