/*
 * Created on Tue Jul 8 2022
 *
 * Author: Siddharth Kharwar
 */
import React from "react";
import moment from "moment";
import { Avatar, Box, Stack, Typography, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context";

const BlogFooter = ({ blog, handleMenu }) => {
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();
  const blogId = blog._id;
  const createdBy = blog.createdBy;
  const createdAt = blog.createdAt;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 1,
        padding: "16px",
        backgroundColor: grey[200],
      }}
    >
      <Box
        sx={{ display: "flex", flex: 1, mr: 1 }}
        onClick={() => navigate(`/blog-details/${blogId}`, { state: { blog } })}
      >
        <Avatar src={createdBy.image} />
        <Stack ml={1}>
          <Typography variant="body1" sx={{ lineHeight: 1.4 }}>
            {createdBy.firstname} {createdBy.lastname}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1, color: grey[600] }}>
            {moment(createdAt).format("YYYY-MM-DD HH:mm")}
          </Typography>
        </Stack>
      </Box>
      {createdBy._id === loggedInUser._id && (
        <IconButton onClick={handleMenu}>
          <MoreHorizIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default BlogFooter;
