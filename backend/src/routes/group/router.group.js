/*
 * Created on Tue Jul 14 2022
 *
 * Author: Tasnim Khan
 */

const groupRouter = require("express").Router();
const { groupController } = require("../../controllers");
const { isAuthenticated } = require("../../middlewares/").commonMiddlewares;

// Group
groupRouter.post("/all", groupController.getAllGroups);
groupRouter.post("/", isAuthenticated, groupController.createGroup);
groupRouter.put("/:id", groupController.updateGroup);
groupRouter.delete("/:id", groupController.deleteGroup);
groupRouter.get("/:id", groupController.getGroupById);

// Members
groupRouter.get("/:id/members", groupController.getAllMembers);
groupRouter.put("/:id/members", groupController.addMember);
groupRouter.delete("/:id/members", groupController.removeMember);
groupRouter.get("/:id/usersToAdd", groupController.getUsersToAdd);

module.exports = groupRouter;
