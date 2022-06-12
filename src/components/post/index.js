import { Paper } from '@mui/material'
import React from 'react'
import PostComment from './post-comment'
import PostContent from './post-content'
import PostFooter from './post-footer'
import PostHeader from './post-header'

const Post = () => {
  return (
    <Paper sx={{ p: 1.5, my: 10 }}>
      <PostHeader />
      <PostContent />
      <PostFooter />
      <PostComment />
    </Paper>
  )
}

export default Post
