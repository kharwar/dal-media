/*
 * Created on Tue Jul 14 2022
 *
 * Author: Tasnim Khan
 */

const fileRouter = require("express").Router();
const { fileController } = require("../../controllers");
const { isAuthenticated } = require("../../middlewares/").commonMiddlewares;

// File
fileRouter.get("/:groupId", fileController.getAllFiles);
fileRouter.post("/", isAuthenticated, fileController.createFile);
fileRouter.delete("/:id", fileController.deleteFile);

module.exports = fileRouter;