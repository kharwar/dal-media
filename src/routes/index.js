import { Routes, Route } from "react-router-dom";
import { Home, Groups, CreatePost, CreateGroup } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/create-group" element={<CreateGroup />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/edit-post/:id" element={<CreatePost />} />
    </Routes>
  );
};

export default AppRoutes;
