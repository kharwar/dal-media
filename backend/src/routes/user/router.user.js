const userRouter = require("express").Router();
const {
  signUp,
  getUsers,
  signIn,
  getUserProfile,
  updateProfile,
  resetpassword,
  forgotpassword,
  getCurrentUser,
} = require("../../controllers/index").userController;
const isAuthenticated = require("../../middlewares/common/isAuthenticated");

userRouter.post("/", isAuthenticated, getUsers);
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.get("/profile/:id", isAuthenticated, getUserProfile);
userRouter.post("/editprofile", isAuthenticated, updateProfile);
userRouter.post("/resetpassword", isAuthenticated, resetpassword);
userRouter.post("/forgotpassword", isAuthenticated, forgotpassword);
userRouter.get("/current", isAuthenticated, getCurrentUser);
module.exports = userRouter;
