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
} from "@mui/material";
import { grey } from "@mui/material/colors";
import react from "react";
import BlogContent from "./BlogContent";
import BlogFooter from "./BlogFooter";

const Blog = ({ blog, handleMenu }) => {
  return (
    <>
      <Paper
        sx={{
          ...styling.blogContainer,
          // backgroundImage: blog.image,
        }}
      >
        {/* Fix image not showing in bg */}
        {
          <img
            style={{}}
            height={"100%"}
            width={"100%"}
            src={require("../../assets/images/blog-bg.jpg")}
          />
        }
        {/* <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            // backgroundColor: grey[500],
          }}
        /> */}
        {/* <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h3" variant="h5" color="#fff" gutterBottom>
                {blog.title}
              </Typography>
            </Box>
          </Grid>
        </Grid> */}
        <Typography
          component="h3"
          variant="h5"
          style={{
            textAlign: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          {blog.title}
        </Typography>
        <BlogFooter blog={blog} handleMenu={handleMenu} />
      </Paper>
    </>
  );
};

export default Blog;

const styling = {
  blogContainer: {
    marginTop: "8px",
    position: "relative",
    // backgroundColor: "grey.800",
    // color: '#000000',
    mb: 4,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
};
