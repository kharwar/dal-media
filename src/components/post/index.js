import { Paper } from "@mui/material";
import React, { memo } from "react";
import PostComment from "./post-comment";
import PostContent from "./post-content";
import PostFooter from "./post-footer";
import PostHeader from "./post-header";
import _ from "lodash";

const Post = ({ post, handleMenu }) => {
  console.log("POST");

  return (
    <Paper sx={{ p: 1.5, my: 1 }}>
      <PostHeader post={post} handleMenu={handleMenu} />
      <PostContent post={post} />
      <PostFooter post={post} />
      <PostComment post={post} />
    </Paper>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return _.isEqual(prevProps.post, nextProps.post);
};

export default memo(Post, propsAreEqual);
