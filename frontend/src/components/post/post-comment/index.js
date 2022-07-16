import { Avatar, Box, InputBase, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState, useRef } from "react";
import { snackbar } from "../../../components";
import { useAuth } from "../../../context";
import SeeMoreText from "../../see-more-text";

const PostComment = ({ post }) => {
  const [comments, setComments] = useState(post.comments);
  const inputRef = useRef(null);
  const { loggedInUser } = useAuth();

  const handleAddComment = (e) => {
    if (e.key === "Enter") {
      inputRef.current.value = "";
      snackbar.current.showSnackbar(true, "Comment Posted");
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Avatar
          src={loggedInUser.image}
          sx={{ width: "32px", height: "32px" }}
        />
        <InputBase
          inputRef={inputRef}
          fullWidth
          placeholder="Write a comment..."
          onKeyDown={handleAddComment}
          sx={{
            backgroundColor: grey[200],
            py: 0.5,
            px: 1.5,
            borderRadius: 20,
            fontSize: "15px",
          }}
        />
      </Stack>

      {comments.map((item, index) => (
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} key={item.id}>
          <Avatar
            src={item.user.image}
            sx={{ width: "32px", height: "32px" }}
          />
          <Stack
            spacing={1}
            sx={{ backgroundColor: grey[200], borderRadius: 3, p: 1 }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "600", lineHeight: 1 }}
            >
              {item.user.name}
            </Typography>
            <SeeMoreText variant="body2" sx={{ lineHeight: 1.2 }}>
              {item.body}
            </SeeMoreText>
          </Stack>
        </Stack>
      ))}
    </Box>
  );
};

export default PostComment;
