const userController = require("./user/controller.user");
const postController = require("./post/controller.post");
const blogController = require("./blog/controller.blog");
const groupController = require("./group/controller.group");

module.exports = {
  userController,
  blogController,
  postController,
  groupController,
};
