import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import BlogList from "../../components/BlogList";
import { apiRoutes, ServiceManager } from "../../services";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    ServiceManager.getInstance()
      .request(apiRoutes.getBlogs)
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Container maxWidth="sm">
      <BlogList blogs={blogs} />
    </Container>
  );
};

export default Blogs;
