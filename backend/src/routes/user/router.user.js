/*
  Created on July 5th 2022
  Author: Kavya Kasaraneni
*/

const userRouter = require("express").Router();
const {
  signUp,
  getUsers,
  signIn,
  getUserProfile,
  updateProfile,
  resetPassword,
  changePassword,
  getCurrentUser,
} = require("../../controllers/index").userController;
const isAuthenticated = require("../../middlewares/common/isAuthenticated");

//user modules routes to access backend api

userRouter.post("/", isAuthenticated, getUsers);
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.put("/profile/:id", isAuthenticated, getUserProfile);
userRouter.put("/editprofile", isAuthenticated, updateProfile);
userRouter.post("/change-password", isAuthenticated, changePassword);
userRouter.post("/reset-password", resetPassword);
// userRouter.post("/forgotpassword", isAuthenticated, forgotpassword);
userRouter.get("/current", isAuthenticated, getCurrentUser);
module.exports = userRouter;
