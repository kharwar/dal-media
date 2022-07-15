import { Box, ImageList, ImageListItem, Typography } from '@mui/material';
import React from 'react';
import SeeMoreText from '../../see-more-text';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const EventContent = ({ event: { description, images, start_DT, end_DT, location } }) => {

  const renderImages = () => {
    return (
      <ImageList
        sx={{ width: '100%', m: 0 }}
        variant="quilted"
        //cols={3}
        rowHeight={180}
      >
        {images.map((image, index) => (
          <Paper
            variant='outlined' key={index + ''}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
            <ImageListItem>
              <img
                src={`${image}?fit=crop&auto=format`}
                loading="lazy"
              />
            </ImageListItem>
          </Paper>
        ))}
      </ImageList>
    );
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Stack spacing={1}>
        <Item>
          <SeeMoreText variant='body1' sx={{ mb: 1, fontSize: '15px' }}>
            {description}
          </SeeMoreText>
        </Item>



        <Item>

          <Box sx={{ display: 'flex', flex: 1, mr: 1 }}>
            <Typography variant='subtitle1' sx={{ lineHeight: 2.2, fontWeight: 'bold' }} >
              Starts On:&nbsp;&nbsp;
            </Typography>
            <Typography variant='subtitle1' sx={{ lineHeight: 2.2, }} >
              {start_DT}
            </Typography>

          </Box>

        </Item>

        <Item>

          <Box sx={{ display: 'flex', flex: 1, mr: 1 }}>
            <Typography variant='subtitle1' sx={{ lineHeight: 2.2, fontWeight: 'bold' }} >
              Ends On:&nbsp;&nbsp;
            </Typography>
            <Typography variant='subtitle1' sx={{ lineHeight: 2.2, }} >
              {end_DT}
            </Typography>

          </Box>

        </Item>

        <Item>

          <Box sx={{ display: 'flex', flex: 1, mr: 1 }}>
            <LocationOnIcon fontSize="medium" />
            <Stack ml={1}>
              <Typography variant='subtitle1' sx={{ lineHeight: 1.8, fontWeight: 'bold' }} >
                {location}
              </Typography>
            </Stack>
          </Box>

        </Item>

        <Item>
          {images.length > 0 && renderImages()}
        </Item>

      </Stack>
    </Box>
  );
};

export default EventContent;

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    // cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',

  },
  // {
  //   img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
  //   title: 'Basketball',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  //   title: 'Fern',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  //   title: 'Mushrooms',
  //   rows: 2,
  //   cols: 2,
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  //   title: 'Tomato basil',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  //   title: 'Sea star',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
  //   title: 'Bike',
  //   cols: 2,
  // },
];