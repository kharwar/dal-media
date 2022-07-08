import React from 'react';
import { Avatar, Box, Stack, Typography, IconButton, Divider } from '@mui/material';
import { grey } from '@mui/material/colors';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { loggedInUser } from '../../../data';

const BlogFooter = ({ blog: { user, createdAt }, handleMenu }) => {

  return (

    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, padding: '16px', backgroundColor: grey[200] }}>
      <Box sx={{ display: 'flex', flex: 1, mr: 1 }}>
        <Avatar src={user.image} />
        <Stack ml={1}>
          <Typography variant='body1' sx={{ lineHeight: 1.4 }}>
            {user.name}
          </Typography>
          <Typography variant='body2' sx={{ lineHeight: 1, color: grey[600] }}>
            {createdAt}
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

export default BlogFooter;