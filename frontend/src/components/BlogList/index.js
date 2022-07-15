import Blog from "../Blog";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import { blogs } from "../../data";
import { Menu, MenuItem } from "@mui/material";
import { useAlert } from "../alert-dialog";
import { useNavigate } from "react-router-dom";
import { snackbar } from "../../components";

const BlogList = ({ blogs }) => {
  const blogRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { setAlert, setOnAgree } = useAlert();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => {
    setOnAgree(onDelete);
  }, []);

  const handleMenu = (event, blog) => {
    blogRef.current = blog;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    const blog = blogRef.current;
    navigate(`edit/${blog._id}`, { state: { blog } });
  };

  const onDelete = () => {
    snackbar.current.showSnackbar(true, "Blog Deleted");
    console.log("delete");
  };

  const handleDelete = () => {
    handleClose();
    setAlert(true, "Delete Blog", "Are you sure you want to delete this blog?");
  };

  const renderBlogs = useCallback((blog) => {
    return (
      <Blog
        blog={blog}
        key={blog._id}
        handleMenu={(event) => handleMenu(event, blog)}
      />
    );
  });

  return (
    <>
      {blogs.map(renderBlogs)}
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

export default BlogList;
