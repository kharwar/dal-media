import { Container } from "@mui/material";
import { useEffect } from "react";
import PostList from "../../components/post-list";

const Home = () => {
  console.log("HOME");

  useEffect(() => {
    console.log("mount");

    return () => {
      console.log("unmout");
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <PostList />
    </Container>
  );
};

export default Home;
