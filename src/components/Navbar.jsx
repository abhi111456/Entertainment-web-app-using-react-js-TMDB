import * as React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Dashboard, LocalMovies } from "@mui/icons-material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Avatar } from "@mui/material";

export default function Navbar() {
  return (
    <Box sx={{ display: 'flex',  width: '100%', alignItems: 'center', justifyContent: 'space-between' ,height:'60px',marginBottom:'10px',
    backgroundColor:'#171D2F',borderRadius:'20px',color:'skyblue',marginTop:'0px'
    }}>
      <MovieCreationIcon sx={{ fontSize: '30px',color:'red',marginLeft:'10px' }} />
      <List
        role="menubar"
        orientation="horizontal"
        sx={{
          "--List-radius": "8px",
          "--List-padding": "4px",
          "--List-gap": "8px",
          "--ListItem-gap": "0px",
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
         
        }}
      >
        <ListItem role="none">
          <ListItemButton role="menuitem" component="div">
            <Dashboard sx={{ color:'gray'}} />
          </ListItemButton>
        </ListItem>
        <ListItem role="none">
          <ListItemButton role="menuitem" component="div">
            <LocalMovies sx={{ color:'gray'}}/>
          </ListItemButton>
        </ListItem>
        <ListItem role="none">
          <ListItemButton role="menuitem" component="div">
            <LiveTvIcon sx={{ color:'gray'}}/>
          </ListItemButton>
        </ListItem>
        <ListItem role="none">
          <ListItemButton role="menuitem" component="div">
            <BookmarkIcon sx={{ color:'gray'}} />
          </ListItemButton>
        </ListItem>
      </List>
      <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" sx={{marginRight:'10px'}} />
    </Box>
  );
}
