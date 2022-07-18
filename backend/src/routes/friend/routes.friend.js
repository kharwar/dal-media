/*
 * Created on Tue Jul 18 2022
 *
 * Author: Siddharth Kharwar
 */

const friendRouter = require("express").Router();
const { friendController } = require("../../controllers");
const { isAuthenticated } = require("../../middlewares/").commonMiddlewares;

friendRouter.get("/", friendController.getMyFriends);
friendRouter.post("/accept", friendController.acceptFriendRequest);
friendRouter.get("/request", friendController.getFriendRequests);
friendRouter.post("/request", friendController.sendFriendRequest);

module.exports = friendRouter;
