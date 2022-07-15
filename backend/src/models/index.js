const User = require("./user/model.user");
const Post = require("./post/model.post");
const Otp = require("./otp/model.otp");
const Blog = require("./blog/model.blog");
const Group = require("./group/model.group");
const Event = require("./events/model.event");

module.exports = {
  User,
  Blog,
  Post,
  Event,
  Otp,
  Group,
};
