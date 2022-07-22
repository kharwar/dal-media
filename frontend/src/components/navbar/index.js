import AppBar from "@mui/material/AppBar";
import { Box, Toolbar, Container, Button } from "@mui/material/";
import NavTitle from "./nav-title";
import NavMenuPages from "./nav-menu-pages";
import NavCreateButton from "./nav-create-button";
import NavUser from "./nav-user";
import { useNavigate } from "react-router-dom";

const pages = ["Home", "Groups", "Events", "Blogs"];
const menuPages = [...pages, "Friends"];
const Navbar = () => {
  const navigate = useNavigate();

  const navigateToPage = (page) => {
    if (page === "Home") {
      navigate("/");
    }
    if (page === "Groups") {
      navigate("/groups");
    }
    if (page === "Events") {
      navigate("/event-page");
    }
    if (page === "Blogs") {
      navigate("/blogs");
    }
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavTitle
            title="Dal-Media"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          />

          <NavMenuPages pages={menuPages} />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigateToPage(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <NavCreateButton />

          <NavUser />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
