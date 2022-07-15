const userService = require("./user/services.user");
const postService = require("./post/service.post");
const eventService = require("./event/service.event");
const otpService = require("./otp/services.otp");
const blogService = require("./blog/service.blog");
const groupService = require("./group/service.group");

module.exports = {
  userService,
  blogService,
  postService,
  eventService,
  otpService,
  groupService,
};
