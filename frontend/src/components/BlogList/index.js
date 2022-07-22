/*
 * Created on Tue Jul 8 2022
 *
 * Author: Siddharth Kharwar
 */
import Blog from "../Blog";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import { blogs } from "../../data";
import { Menu, MenuItem } from "@mui/material";
import { useAlert } from "../alert-dialog";
import { useNavigate } from "react-router-dom";
import { snackbar } from "../../components";
import { apiRoutes, ServiceManager } from "../../services";

const deleteBlog = (blogId, setBlogs) => {
  ServiceManager.getInstance()
    .request(`${apiRoutes.getBlogs}/${blogId}`, null, "delete")
    .then((res) => {
      snackbar.current.showSnackbar(true, "Blog Deleted");
      fetchBlogs(setBlogs);
    })
    .catch((error) => {});
};

const fetchBlogs = async (setBlogs) => {
  ServiceManager.getInstance()
    .request(apiRoutes.getBlogs)
    .then((res) => {
      setBlogs(res.data.blogs);
    })
    .catch((error) => {});
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const blogRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { setAlert, setOnAgree } = useAlert();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchBlogs(setBlogs);
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
    deleteBlog(blogRef.current._id, setBlogs);
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
