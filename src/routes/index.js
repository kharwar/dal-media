import { Routes, Route } from "react-router-dom";
import { Home, CreatePost } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/edit-post/:id" element={<CreatePost />} />
    </Routes>
  )
}

export default AppRoutes;