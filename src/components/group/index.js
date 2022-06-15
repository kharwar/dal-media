import { Paper } from "@mui/material";
import React, { memo } from "react";
import PostComment from "./post-comment";
import PostContent from "./post-content";
import PostFooter from "./post-footer";
import PostHeader from "./post-header";
import _ from "lodash";

const Group = ({ post, handleMenu }) => {
  console.log("POST");

  return (
    <Paper sx={{ p: 1.5, my: 1 }}>
      <PostContent />
    </Paper>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return _.isEqual(prevProps.post, nextProps.post);
};

export default memo(Group, propsAreEqual);
