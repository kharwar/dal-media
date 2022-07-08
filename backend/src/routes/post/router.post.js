/*
 * Created on Tue Jul 05 2022
 *
 * Author: Naveed Hussain Khowaja
 */

const postRouter = require("express").Router();
const { postController } = require("../../controllers");

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.post("/create", postController.createPost);
postRouter.put("/update/:id", postController.updatePost);
postRouter.delete("/delete/:id", postController.deletePost);
postRouter.post("/like", postController.likePost);

module.exports = postRouter;
