/*
 * Created on Tue Jul 8 2022
 *
 * Author: Siddharth Kharwar
 */
const blogRouter = require("express").Router();
const { blogController } = require("../../controllers");
const { isAuthenticated } = require("../../middlewares/").commonMiddlewares;

blogRouter.post("/create", isAuthenticated, blogController.createBlog);
blogRouter.get("/:id", blogController.getBlogById);
blogRouter.get("/", blogController.getAllBlogs);
blogRouter.put("/:id", isAuthenticated, blogController.updateBlog);
blogRouter.delete("/:id", blogController.deleteBlog);

module.exports = blogRouter;
