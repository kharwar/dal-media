import { Avatar, Box, Stack, Typography, IconButton } from '@mui/material'
import React from 'react'
import Images from '../../../assets';
import { grey } from '@mui/material/colors';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const PostHeader = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Box sx={{ display: 'flex', flex: 1, mr: 1 }}>
        <Avatar src={Images.avatar} />
        <Stack ml={1}>
          <Typography variant='subtitle1' sx={{ lineHeight: 1.3, }} >
            Jeff Hardy
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: '400', lineHeight: 1, color: grey[600] }}>
            June 2, 2022
          </Typography>
        </Stack>
      </Box>
      <IconButton sx={{ alignSelf: 'flex-end' }}>
        <MoreHorizIcon />
      </IconButton>
    </Box>
  )
}

export default PostHeader
