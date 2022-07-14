const userRouter = require("express").Router();
const { signup, getUsers, signin, getUserProfile,updateProfile,resetpassword,forgotpassword } = require("../../controllers/index").userController;
const { isAuthenticated } = require("../../middlewares/").userMiddlewares;

userRouter.post("/", isAuthenticated, getUsers);
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/profile/:id",isAuthenticated, getUserProfile);
userRouter.post("/editprofile",isAuthenticated, updateProfile);
userRouter.post("/resetpassword",isAuthenticated, resetpassword);
userRouter.post("/forgotpassword",isAuthenticated, forgotpassword);
module.exports = userRouter;


