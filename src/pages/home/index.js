import { Container, InputBase, Paper, Stack } from "@mui/material";
import { PostList, snackbar } from "../../components";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  // const { open, showSnackbar } = useSnackbar();
  const handleSearch = (event) => {
    if (!snackbar.current.open) {
      snackbar.current.showSnackbar(true, "Searching...");
      // showSnackbar(true, "Searching...");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        variant="outlined"
        sx={{ display: "flex", alignItems: "center", mt: 1 }}
      >
        <InputBase
          sx={{ mx: 1, flex: 1, py: 0.75 }}
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
          onChange={handleSearch}
        />
        <SearchIcon sx={{ mr: 1 }} />
      </Paper>
      <PostList />
    </Container>
  );
};

export default Home;
