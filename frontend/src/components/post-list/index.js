import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import Post from "../post";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../alert-dialog";
import { snackbar } from "../../components";
import { apiRoutes, ServiceManager } from "../../services";
import { async } from "@firebase/util";
import { useAuth } from "../../context";

const PostList = (props) => {
  const { setAlert, setOnAgree } = useAlert();
  const navigate = useNavigate();
  const postRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [posts, setPosts] = useState(props.posts);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    setPosts(props.posts);
  }, [props.posts]);

  useEffect(() => {
    setOnAgree(onDelete);
  }, [posts]);

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
    navigate(`edit-post/${post._id}`, { state: { post } });
  };

  const onDelete = async () => {
    const postId = postRef.current._id;
    try {
      await ServiceManager.getInstance().request(
        apiRoutes.deletePost,
        {
          id: postId,
        },
        "delete"
      );

      const newPosts = posts.filter((post) => post._id != postId);
      setPosts(newPosts);
      snackbar.current.showSnackbar(true, "Post Deleted");
    } catch (error) {}
  };

  const handleDelete = () => {
    handleClose();
    setAlert(true, "Delete Post", "Are you sure you want to delete this post?");
  };

  const handleLike = (postId, isLiked) => async () => {
    try {
      const { data } = await ServiceManager.getInstance().request(
        apiRoutes.likeDislikePost,
        {
          postId,
          isLiked,
        },
        "post"
      );
      // snackbar.current.showSnackbar(true, "Post Liked");
    } catch (error) {}
  };

  const handleComment = async (postId, comment) => {
    try {
      const { data } = await ServiceManager.getInstance().request(
        apiRoutes.commentOnPost,
        {
          postId,
          comment: comment.comment,
        },
        "post"
      );
      // snackbar.current.showSnackbar(true, "Post Liked");
    } catch (error) {}
  };

  const renderPost = useCallback((post) => {
    const isLiked = post.likes.includes(loggedInUser._id);

    return (
      <Post
        post={post}
        key={post._id}
        handleMenu={(event) => handleMenu(event, post)}
        handleLike={handleLike(post._id, isLiked)}
        isPostLiked={isLiked}
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
