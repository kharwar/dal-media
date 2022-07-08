import { Avatar, Box, Stack, Typography, IconButton } from '@mui/material';
import React from 'react';
import Images from '../../../assets';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { grey } from '@mui/material/colors';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { loggedInUser, events } from '../../../data';

const EventHeader = ({ event: { user, title }, handleMenu }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Box sx={{ display: 'flex', flex: 1, mr: 1 }}>
        <EventAvailableIcon fontSize="large" />
        <Stack ml={1}>
          <Typography variant='subtitle1' sx={{ lineHeight: 2.2, fontWeight: 'bold' }} >
            {title}
          </Typography>
        </Stack>
      </Box>
      {
        user.id === loggedInUser.id &&
        <IconButton onClick={handleMenu}>
          <MoreHorizIcon />
        </IconButton>
      }

    </Box>
  );
};

export default EventHeader;