/*
 * Created on Tue Jul 14 2022
 *
 * Author: Tasnim Khan
 */

const groupRouter = require("express").Router();
const { groupController } = require("../../controllers");
const { isAuthenticated } = require("../../middlewares/").commonMiddlewares;

groupRouter.get("/", groupController.getAllGroups);
groupRouter.post("/", isAuthenticated, groupController.createGroup);
groupRouter.put("/:id", groupController.updateGroup);
groupRouter.delete("/:id", groupController.deleteGroup);
groupRouter.get("/:id", groupController.getGroupById);

module.exports = groupRouter;
