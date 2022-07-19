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
import { dateFormat } from "../../../utils";
import { useAuth } from "../../../context";

const PostHeader = ({ post: { createdBy, createdAt }, handleMenu }) => {
  const { loggedInUser } = useAuth();

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box sx={{ display: "flex", flex: 1, mr: 1 }}>
          <Avatar src={createdBy.image} />
          <Stack ml={1}>
            <Typography variant="body1" sx={{ lineHeight: 1.4 }}>
              {`${createdBy.firstname} ${createdBy.lastname}`}
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1, color: grey[600] }}
            >
              {dateFormat(createdAt, "MMMM DD, YYYY")}
            </Typography>
          </Stack>
        </Box>
        {createdBy._id === loggedInUser._id && (
          <IconButton onClick={handleMenu}>
            <MoreHorizIcon />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ mb: 1 }} />
    </>
  );
};

export default PostHeader;
