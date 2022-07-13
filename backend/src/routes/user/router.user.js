const userRouter = require("express").Router();
const { signup, getUsers, signin, getUserProfile,updateProfile } = require("../../controllers/index").userController;
const { isAuthenticated } = require("../../middlewares/").userMiddlewares;

userRouter.post("/", isAuthenticated, getUsers);
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/profile",isAuthenticated, getUserProfile);
userRouter.post("/editprofile",isAuthenticated, updateProfile);
module.exports = userRouter;


