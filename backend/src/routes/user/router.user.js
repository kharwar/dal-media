const userRouter = require("express").Router();
const { getUsers } = require("../../controllers/index").userController;
const { isAuthenticated } = require("../../middlewares/").commonMiddlewares;

userRouter.get("/", isAuthenticated, getUsers);

module.exports = userRouter;
