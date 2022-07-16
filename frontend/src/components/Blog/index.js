/*
 * Created on Tue Jul 8 2022
 *
 * Author: Siddharth Kharwar
 */
import { Typography, Paper, Stack } from "@mui/material";
import BlogFooter from "./BlogFooter";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog, handleMenu }) => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        ...styling.blogPaper,
      }}
    >
      <Stack style={{ minHeight: "250px" }}>
        <img
          width="100%"
          height="100%"
          src={
            blog.image ??
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsbRYnwHo7eSy-5Uc29L1UgYk2kgVhH9qO1A&usqp=CAU"
          }
          onClick={() =>
            navigate(`/blog-details/${blog._id}`, { state: { blog } })
          }
        />
        <Typography
          component="h2"
          variant="h5"
          onClick={() =>
            navigate(`/blog-details/${blog._id}`, { state: { blog } })
          }
          style={{
            position: "absolute",
            top: "60%",
            right: 0,
            width: "100%",
          }}
        >
          <span style={{ ...styling.textSpan }}>{blog.title}</span>
        </Typography>
      </Stack>
      <BlogFooter blog={blog} handleMenu={handleMenu} />
    </Paper>
  );
};

export default Blog;

const styling = {
  blogPaper: {
    marginTop: "8px",
    position: "relative",
    marginBottom: "8px",
  },
  textSpan: {
    color: "white",
    font: "bold 24px/45px Helvetica, Sans-Serif",
    letterSpacing: "-1px",
    background: "rgb(0,0,0)",
    background: "rgb(0,0,0, 0.7)",
    padding: "10px",
  },
};
