import { Container, InputBase, Paper, Stack } from "@mui/material";
import { PostList, snackbar } from "../../components";
import SearchIcon from "@mui/icons-material/Search";
import { posts } from "../../data";
import { useContext, useEffect } from "react";
import { apiRoutes, ServiceManager } from "../../services";
import { AuthContext } from "../../context";
const Home = () => {
  const { loggedInUser } = useContext(AuthContext);
  console.log({ loggedInUser });
  // useEffect(() => {
  //   ServiceManager.getInstance()
  //     .request(apiRoutes.getPosts)
  //     .then((res) => {
  //       console.log({ res });
  //     })
  //     .catch((error) => {
  //       console.log({ error });
  //     });
  // }, []);

  const handleSearch = (event) => {
    if (!snackbar.current.open) {
      snackbar.current.showSnackbar(true, "Searching...");
    }
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
