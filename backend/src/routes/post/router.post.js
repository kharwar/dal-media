const postRouter = require("express").Router();
const { postController } = require("../../controllers");

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.post("/create", postController.createPost);
postRouter.put("/update/:id", postController.updatePost);
postRouter.delete("/delete/:id", postController.deletePost);

module.exports = postRouter;
