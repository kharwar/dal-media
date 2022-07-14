import React from "react";
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

const PostHeader = ({ post: { user, createdAt }, handleMenu }) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box sx={{ display: "flex", flex: 1, mr: 1 }}>
          {/* <Avatar src={user.image} />
          <Stack ml={1}>
            <Typography variant="body1" sx={{ lineHeight: 1.4 }}>
              {user.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1, color: grey[600] }}
            >
              {createdAt}
            </Typography>
          </Stack> */}
        </Box>
        {
          // user.id === loggedInUser.id
          true && (
            <IconButton onClick={handleMenu}>
              <MoreHorizIcon />
            </IconButton>
          )
        }
      </Box>
      <Divider sx={{ mb: 1 }} />
    </>
  );
};

export default PostHeader;
