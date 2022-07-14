const userService = require("./user/services.user");
const postService = require("./post/service.post");
const blogService = require("./blog/service.blog");
const groupService = require("./group/service.group");

module.exports = {
  userService,
  blogService,
  postService,
  groupService,
};
