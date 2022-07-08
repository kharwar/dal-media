const userRouter = require("express").Router();
const { getUsers } = require("../../controllers/index").userController;
const { isAuthenticated } = require("../../middlewares/").userMiddlewares;

userRouter.get("/", isAuthenticated, getUsers);

module.exports = userRouter;
