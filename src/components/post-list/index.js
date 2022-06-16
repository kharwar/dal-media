import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import Post from "../post";
import { posts } from "../../data";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../alert-dialog";
import { useSnackbar } from "../../context";

const PostList = () => {
  const { setAlert, setOnAgree } = useAlert();
  const navigate = useNavigate();
  const postRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setOnAgree(onDelete);
  }, []);

  const handleMenu = (event, post) => {
    postRef.current = post;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    const post = postRef.current;
    navigate(`edit-post/${post.id}`, { state: { post } });
  };

  const onDelete = () => {
    console.log("delete");
    showSnackbar(true, "Post Deleted");
  };

  const handleDelete = () => {
    handleClose();
    setAlert(true, "Delete Post", "Are you sure you want to delete this post?");
  };

  const handleLike = () => {
    showSnackbar(true, "Post Liked");
  };
  const handleComment = () => {
    showSnackbar(true, "Write Comment");
  };

  const renderPost = useCallback((post) => {
    return (
      <Post
        post={post}
        key={post.id}
        handleMenu={(event) => handleMenu(event, post)}
        handleLike={handleLike}
        handleComment={handleComment}
      />
    );
  }, []);

  return (
    <>
      {posts.map(renderPost)}
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
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default PostList;
