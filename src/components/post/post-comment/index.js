import { Avatar, Box, InputBase, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import Images from '../../../assets'
import SeeMoreText from '../../see-more-text'

const PostComment = () => {
  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Avatar src={Images.avatar} sx={{ width: '32px', height: '32px', }} />
        <InputBase
          fullWidth
          placeholder='Write a comment...'
          sx={{
            backgroundColor: grey[200],
            py: 0.5,
            px: 1.5,
            borderRadius: 20,
            fontSize: '15px'
          }}
        />
      </Stack>
      <Box sx={{}}>
        {
          [1, 2, 3, 4].map((item, index) => (
            <Stack direction="row" spacing={1} sx={{ mt: 1 }} key={item + ''}>
              <Avatar src={Images.avatar} sx={{ width: '32px', height: '32px', }} />
              <Stack sx={{ backgroundColor: grey[200], borderRadius: 3, p: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: '600', lineHeight: 1 }}>
                  James Allen
                </Typography>
                <SeeMoreText variant='body2'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                </SeeMoreText>
              </Stack>
            </Stack>
          ))
        }
      </Box>
    </Box>
  )
}

export default PostComment