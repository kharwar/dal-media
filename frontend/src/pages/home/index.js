import { Container, Grid, InputBase, Paper, Stack } from "@mui/material";
import { FriendsList, PostList, snackbar } from "../../components";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { apiRoutes, ServiceManager } from "../../services";
import _ from "lodash";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const allPosts = useRef();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const { data } = await ServiceManager.getInstance().request(
        apiRoutes.getPosts
      );
      allPosts.current = data;
      setPosts(data);
    } catch (error) {}
  };

  const debounceChangeText = _.debounce(async (keyword) => {
    if (keyword !== "") {
      try {
        const { data } = await ServiceManager.getInstance().request(
          apiRoutes.searchPost,
          { keyword }
        );
        setPosts(data);
      } catch (error) {}
    } else {
      setPosts(allPosts.current);
    }
  }, 1000);

  const handleSearch = (event) => {
    const keyword = event.target.value;
    debounceChangeText(keyword);
  };

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={8.5}>
        <Container maxWidth="sm" fixed={true}>
          <Paper
            variant="outlined"
            sx={{ display: "flex", alignItems: "center", mt: 2 }}
          >
            <InputBase
              sx={{ mx: 1, flex: 1, py: 0.75 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
            <SearchIcon sx={{ mr: 1 }} />
          </Paper>
          <PostList posts={posts} />
        </Container>
      </Grid>
      <Grid item sm={0} md={3.5}>
        <FriendsList />
      </Grid>
    </Grid>
  );
};

export default Home;
