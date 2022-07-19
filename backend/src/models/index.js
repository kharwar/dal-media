const User = require("./user/model.user");
const Post = require("./post/model.post");
const Otp = require("./otp/model.otp");
const Blog = require("./blog/model.blog");
const Group = require("./group/model.group");
const File = require("./file/model.file");
const Event = require("./events/model.event");
const Poll = require("./poll/model.poll");
const Friend = require("./friend/model.friend");

module.exports = {
  User,
  Blog,
  Post,
  Event,
  Otp,
  Group,
  File,
  Poll,
  Friend,
};
