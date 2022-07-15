import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  Stack,
  Container,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import react from "react";
import BlogContent from "./BlogContent";
import BlogFooter from "./BlogFooter";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog, handleMenu }) => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        ...styling.blogPaper,
      }}
      onClick={() => navigate(`/blog-details/${blog._id}`, { state: { blog } })}
    >
      <Stack style={{ minHeight: "250px" }}>
        <img width="100%" height="100%" src={blog.image} />
        {/* <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        /> */}
        <Typography
          component="h2"
          variant="h5"
          style={{
            // textAlign: "center",
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
