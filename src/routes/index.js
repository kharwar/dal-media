import { Routes, Route, Outlet } from "react-router-dom";
import { Navbar } from "../components";
import {
  Home,
  Groups,
  CreatePost,
  CreateGroup,
  Group,
  CreateEvent,
  EventPage,
  CreatePoll,
  DisplayPoll,
  CreateBlog,
  Blogs,
  Login,
  Signup,
  ForgotPassword,
} from "../pages";

const AppRoutes = () => {
  console.log("app");
  return (
    <Routes>
      <Route element={<WithoutNavbar />}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route element={<WithNavbar />}>
        <Route path="/home" element={<Home />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:id" element={<Group />} />
        <Route path="groups/:group/edit-post/:id" element={<CreatePost />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/groups/:id/create-poll" element={<CreatePoll />} />
        <Route path="/display-poll" element={<DisplayPoll />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/event-page" element={<EventPage />} />
        <Route path="/edit-post/:id" element={<CreatePost />} />
        <Route path="/blogs/create" element={<CreateBlog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="blogs/edit/:id" element={<CreateBlog />} />
        <Route path="/event-page/edit-event/:id" element={<CreateEvent />} />
      </Route>
    </Routes>
  );
};

const WithNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const WithoutNavbar = () => <Outlet />;

export default AppRoutes;
