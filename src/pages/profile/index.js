import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { PostList } from "../../components";
import { loggedInUser } from "../../data";
import theme from "../../theme";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { posts } from "../../data";
const Profile = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event, post) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditProfile = () => {
    handleClose();
    navigate("/edit-profile", { state: { user: loggedInUser } });
  };

  const handleChangePassword = () => {
    handleClose();
    navigate("/change-password");
  };

  const getPosts = () => {
    return posts.filter(({ user }) => user.id == loggedInUser.id);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper sx={{ p: 2, mt: 2 }}>
          <Stack direction="row">
            <Avatar
              src={loggedInUser.image}
              sx={{
                width: 100,
                height: 100,
                borderStyle: "solid",
                borderWidth: 0.5,
                borderColor: theme.palette.primary,
              }}
            />
            <Box sx={{ width: "100%", ml: 3 }}>
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Typography variant="h5">{loggedInUser.name}</Typography>
                <IconButton onClick={handleMenu}>
                  <MoreHorizIcon />
                </IconButton>
              </Stack>
              <Typography variant="body2" color={grey[600]}>
                {loggedInUser.email}
              </Typography>
              <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                <Stack direction="row" spacing={0.5}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {`${loggedInUser.total_posts}`}
                  </Typography>
                  <Typography>Posts</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {`${loggedInUser.total_friends}`}
                  </Typography>
                  <Typography>Friends</Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          <Typography sx={{ mt: 2 }} variant="body2">
            {loggedInUser.bio}
          </Typography>
        </Paper>
      </Container>
      <Container maxWidth="sm">
        <PostList posts={getPosts()} />
      </Container>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
        <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
