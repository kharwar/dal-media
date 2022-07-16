import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import BlogList from "../../components/BlogList";
import { apiRoutes, ServiceManager } from "../../services";
const Blogs = () => {

  return (
    <Container maxWidth="sm">
      <BlogList />
    </Container>
  );
};

export default Blogs;
