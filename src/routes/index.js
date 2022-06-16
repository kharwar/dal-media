import { Routes, Route } from "react-router-dom";
import { Home, CreatePost, CreateBlog, Blogs } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/edit-post/:id" element={<CreatePost />} />
      <Route path="/blogs/create" element={<CreateBlog />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="blogs/edit/:id" element={<CreateBlog />} />
    </Routes>
  );
};

export default AppRoutes;