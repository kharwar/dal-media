const userService = require("./user/services.user");
const postService = require("./post/service.post");
const otpService = require("./otp/services.otp");
const blogService = require("./blog/service.blog");
const groupService = require("./group/service.group");

module.exports = {
  userService,
  blogService,
  postService,
  otpService,
  groupService,
};
