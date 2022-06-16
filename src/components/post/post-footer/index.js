import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const PostFooter = ({
  post: { total_likes, total_comments },
  handleLike,
  handleComment,
}) => {
  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: "space-between", mb: 1 }}>
        <Stack direction="row" spacing={1}>
          <ThumbUpIcon />
          <Typography variant="body1">{total_likes}</Typography>
        </Stack>
        <Typography variant="body1">{`${total_comments} comments`}</Typography>
      </Stack>
      <Divider sx={{ mb: 1 }} />
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button variant="outlined" fullWidth onClick={handleLike}>
          <ThumbUpOutlinedIcon sx={{ mr: 1 }} />
          <Typography variant="body1">Like</Typography>
        </Button>
        <Divider />
        <Button variant="outlined" fullWidth onClick={handleComment}>
          <ChatBubbleOutlineOutlinedIcon sx={{ mr: 1 }} />
          <Typography variant="body1">Comment</Typography>
        </Button>
      </Stack>
      <Divider sx={{ mb: 1 }} />
    </Box>
  );
};

export default PostFooter;
