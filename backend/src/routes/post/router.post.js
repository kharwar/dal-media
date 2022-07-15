/*
 * Created on Tue Jul 05 2022
 *
 * Author: Naveed Hussain Khowaja
 */

const postRouter = require("express").Router();
const { postController } = require("../../controllers");
const isAuthenticated = require("../../middlewares/common/isAuthenticated");

postRouter.get("/", isAuthenticated, postController.getAllPosts);
postRouter.get("/:id", isAuthenticated, postController.getPostById);
postRouter.post("/create", isAuthenticated, postController.createPost);
postRouter.put("/update", isAuthenticated, postController.updatePost);
postRouter.delete("/delete", isAuthenticated, postController.deletePost);
postRouter.post("/like", isAuthenticated, postController.likePost);

module.exports = postRouter;
