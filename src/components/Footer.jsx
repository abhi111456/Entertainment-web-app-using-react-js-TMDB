import * as React from 'react';
import Box from '@mui/joy/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/joy/Typography';
import { Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: '25px',
        backgroundColor: '#171D2F',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ marginBottom: '10px',fontSize:'22px' }}>Product</Typography>
          <Link href="#" color="inherit" sx={{ display: 'block',fontSize:'20px', marginBottom: '5px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Features</Link>
          <Link href="#" color="inherit" sx={{ display: 'block', fontSize:'20px',marginBottom: '5px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Integrations</Link>
          <Link href="#" color="inherit" sx={{ display: 'block', fontSize:'20px',marginBottom: '5px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Pricing</Link>
          <Link href="#" color="inherit" sx={{ display: 'block', fontSize:'20px',marginBottom: '5px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>FAQ</Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ marginBottom: '10px',fontSize:'22px'  }}>Company</Typography>
          <Link href="#" color="inherit" sx={{ display: 'block', fontSize:'20px',marginBottom: '5px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Privacy</Link>
          <Link href="#" color="inherit" sx={{ display: 'block', fontSize:'20px',marginBottom: '5px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Pricing</Link>
          <Link href="#" color="inherit" sx={{ display: 'block', fontSize:'20px',marginBottom: '5px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Pricing</Link>
          <Link href="#" color="inherit" sx={{ display: 'block', fontSize:'20px',marginBottom: '5px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Terms of Service</Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ marginBottom: '10px' ,fontSize:'22px' }}>Developers</Typography>
          <Link href="#" color="inherit" sx={{ display: 'block',fontSize:'20px', marginBottom: '5px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Pricing</Link>
          <Link href="#" color="inherit" sx={{ display: 'block', fontSize:'20px',marginBottom: '5px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Developer API</Link>
          <Link href="#" color="inherit" sx={{ display: 'block', fontSize:'20px',marginBottom: '5px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Documentation</Link>
          <Link href="#" color="inherit" sx={{ display: 'block', fontSize:'20px',marginBottom: '5px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Guides</Link>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Your Website. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ marginTop: '10px' }}>
          Follow us on:
          <Link href="https://github.com/" color="inherit" sx={{ marginLeft: '10px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            <GitHubIcon />
          </Link>
          <Link href="https://twitter.com/" color="inherit" sx={{ marginLeft: '10px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            <TwitterIcon />
          </Link>
          <Link href="https://facebook.com/" color="inherit" sx={{ marginLeft: '10px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            <FacebookIcon />
          </Link>
          <Link href="https://instagram.com/" color="inherit" sx={{ marginLeft: '10px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            <InstagramIcon />
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
