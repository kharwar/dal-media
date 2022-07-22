import { Routes, Route, Outlet, useNavigate, Navigate } from "react-router-dom";
import { Navbar } from "../components";
import { useAuth } from "../context";
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
  BlogDetail,
  Login,
  Signup,
  ForgotPassword,
  Profile,
  ChangePassword,
  ResetPassword,
  Friends,
} from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<WithoutNavbar />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:passcode" element={<ResetPassword />} />
      </Route>
      <Route
        path="*"
        element={
          <RequireAuth>
            <ProtectedRoutes />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route element={<WithNavbar />}>
        <Route path="/" element={<Home />} />
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
        <Route path="/blog-details/:id" element={<BlogDetail />} />
        <Route path="blogs/edit/:id" element={<CreateBlog />} />
        <Route path="/event-page/edit-event" element={<CreateEvent />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<Signup />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
};

const RequireAuth = ({ children }) => {
  const { loggedInUser } = useAuth();
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
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
