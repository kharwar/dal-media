import { Routes, Route } from "react-router-dom";
import { Home, CreatePost, CreateEvent, EventPage } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/event-page" element={<EventPage />} />
      <Route path="/edit-post/:id" element={<CreatePost />} />
      <Route path="/event-page/edit-event/:id" element={<CreateEvent />} />
    </Routes>
  );
};

export default AppRoutes;