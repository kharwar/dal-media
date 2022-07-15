import React from "react";
import moment from "moment";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { loggedInUser } from "../../../data";

const BlogFooter = ({ blog: { createdBy, createdAt }, handleMenu }) => {
  createdBy = loggedInUser;
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
      <Box sx={{ display: "flex", flex: 1, mr: 1 }}>
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
      {/* {createdBy._id === loggedInUser.id && ( */}
      { true && (
        <IconButton onClick={handleMenu}>
          <MoreHorizIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default BlogFooter;
