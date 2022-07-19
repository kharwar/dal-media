import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import _ from "lodash";
import { useAuth } from "../../../context";

const PostFooter = ({
  post: { _id, likes: postLikes, comments },
  handleLike,
  isPostLiked,
  commentInputRef,
}) => {
  const [likes, setLikes] = useState(postLikes);
  const [isLiked, setIsLiked] = useState(isPostLiked);
  const { loggedInUser } = useAuth();

  const handleLikePost = () => {
    let newLikes = [...likes];
    let liked = isLiked;

    if (isLiked) {
      _.pull(newLikes, loggedInUser._id);
      liked = false;
    } else {
      newLikes.push(loggedInUser._id);
      liked = true;
    }
    setLikes(newLikes);
    setIsLiked(liked);
    handleLike?.();
  };

  const handleOnComment = () => {
    commentInputRef?.current?.focus();
  };

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: "space-between", mb: 1 }}>
        <Stack direction="row" spacing={1}>
          {isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          <Typography variant="body1">{likes.length}</Typography>
        </Stack>
        <Typography variant="body1">{`${comments.length} comments`}</Typography>
      </Stack>
      <Divider sx={{ mb: 1 }} />
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button variant="outlined" fullWidth onClick={handleLikePost}>
          <ThumbUpOutlinedIcon sx={{ mr: 1 }} />
          <Typography variant="body1">Like</Typography>
        </Button>
        <Divider />
        <Button variant="outlined" fullWidth onClick={handleOnComment}>
          <ChatBubbleOutlineOutlinedIcon sx={{ mr: 1 }} />
          <Typography variant="body1">Comment</Typography>
        </Button>
      </Stack>
      <Divider sx={{ mb: 1 }} />
    </Box>
  );
};

export default PostFooter;
