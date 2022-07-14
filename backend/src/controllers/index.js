const userController = require("./user/controller.user");
const postController = require("./post/controller.post");
const otpController = require("./otp/controller.otp");
// const emailController = require("./email/controller.email");
const blogController = require("./blog/controller.blog");
const groupController = require("./group/controller.group");

module.exports = {
  userController,
  blogController,
  postController,
  otpController,
  // emailController,
  groupController,
};
