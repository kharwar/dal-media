import { Routes, Route } from "react-router-dom";
import { Home, Groups, CreatePost, CreateGroup, Group } from "../pages";

const AppRoutes = () => {
  console.log("app");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/groups/:id" element={<Group />} />
      <Route path="groups/:group/edit-post/:id" element={<CreatePost />} />
      <Route path="/create-group" element={<CreateGroup />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/edit-post/:id" element={<CreatePost />} />
    </Routes>
  );
};

export default AppRoutes;
