// Footer.js
import React from 'react';
import styled from 'styled-components';
import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterContainer = styled(Box)`
 
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: auto;
  text-align: center;
`;

const SocialIcons = styled(Box)`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="h6" component="p">
        Movies App
      </Typography>
      <Typography variant="body2" component="p">
        © {new Date().getFullYear()} All Rights Reserved.
      </Typography>
      <SocialIcons>
        <IconButton aria-label="Facebook" component="a" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookIcon style={{ color: '#ffffff' }} />
        </IconButton>
        <IconButton aria-label="Twitter" component="a" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterIcon style={{ color: '#ffffff' }} />
        </IconButton>
        <IconButton aria-label="Instagram" component="a" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramIcon style={{ color: '#ffffff' }} />
        </IconButton>
      </SocialIcons>
    </FooterContainer>
  );
};

export default Footer;
