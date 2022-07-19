/*
 * Created on Tue Jul 05 2022
 *
 * Author: Ridham Kathiriya
 */
const isAuthenticated = require("../../middlewares/common/isAuthenticated");
const pollRouter = require("express").Router();
const { pollController } = require("../../controllers");

pollRouter.post("/create", isAuthenticated, pollController.createPoll);
pollRouter.get("/", pollController.getAllPolls);

module.exports = pollRouter;

