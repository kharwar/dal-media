import {BrowserRouter,Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import Notifications from './pages/Notifications';
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/forgotpassword" element={<ForgotPassword />}/>
        <Route path="/resetpassword" element={<ResetPassword />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/editprofile" element={<EditProfile />}/>
        <Route path="/notifications" element={<Notifications />}/>
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
