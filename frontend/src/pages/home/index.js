import { Container, InputBase, Paper, Stack } from "@mui/material";
import { PostList, snackbar } from "../../components";
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
      console.log({ data });
      allPosts.current = data;
      setPosts(data);
    } catch (error) {
      console.log({ error });
    }
  };

  const debounceChangeText = _.debounce(async (keyword) => {
    if (keyword !== "") {
      try {
        const { data } = await ServiceManager.getInstance().request(
          apiRoutes.searchPost,
          { keyword }
        );
        console.log({ data });
        setPosts(data);
      } catch (error) {
        console.log({ error });
      }
    } else {
      setPosts(allPosts.current);
    }
  }, 1000);

  const handleSearch = (event) => {
    const keyword = event.target.value;
    debounceChangeText(keyword);
  };

  return (
    <Container maxWidth="sm">
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
  );
};

export default Home;
