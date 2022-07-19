const userController = require("./user/controller.user");
const postController = require("./post/controller.post");
const eventController = require("./event/controller.event");
const otpController = require("./otp/controller.otp");
// const emailController = require("./email/controller.email");
const blogController = require("./blog/controller.blog");
const groupController = require("./group/controller.group");
const fileController = require("./file/controller.file");
const pollController = require("./poll/controller.poll");
const friendController = require("./friend/controller.friend");

module.exports = {
  userController,
  blogController,
  postController,
  eventController,
  otpController,
  // emailController,
  groupController,
  fileController,
  pollController,
  friendController,
};
