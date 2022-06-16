import { Routes, Route } from "react-router-dom";
import { Home, Groups, CreatePost, CreateGroup, Group, CreateEvent, EventPage, CreatePoll, DisplayPoll } from "../pages";
import {Login, Register, ForgotPassword, ResetPassword, Profile, EditProfile, Notifications} from "../pages";

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
      <Route path="/groups/:id/create-poll" element={<CreatePoll />} />
      <Route path="/display-poll" element={<DisplayPoll />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/event-page" element={<EventPage />} />
      <Route path="/edit-post/:id" element={<CreatePost />} />
      <Route path="/event-page/edit-event/:id" element={<CreateEvent />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/forgotpassword" element={<ForgotPassword />}/>
      <Route path="/resetpassword" element={<ResetPassword />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/editprofile" element={<EditProfile />}/>
      <Route path="/notifications" element={<Notifications />}/>
    </Routes>
  );
};

export default AppRoutes;
