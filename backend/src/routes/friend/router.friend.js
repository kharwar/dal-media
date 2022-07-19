/*
 * Created on Tue Jul 18 2022
 *
 * Author: Siddharth Kharwar
 */

const friendRouter = require("express").Router();
const { friendController } = require("../../controllers");
const { isAuthenticated } = require("../../middlewares/").commonMiddlewares;

friendRouter.get("/", isAuthenticated, friendController.getMyFriends);
friendRouter.delete("/", isAuthenticated, friendController.unfriend);
friendRouter.post(
  "/accept",
  isAuthenticated,
  friendController.acceptFriendRequest
);
friendRouter.get(
  "/request",
  isAuthenticated,
  friendController.getFriendRequests
);
friendRouter.post(
  "/request",
  isAuthenticated,
  friendController.sendFriendRequest
);
friendRouter.post("/deny", isAuthenticated, friendController.denyFriendRequest);

module.exports = friendRouter;
