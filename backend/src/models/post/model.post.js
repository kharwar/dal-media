/*
 * Created on Tue Jul 05 2022
 *
 * Author: Naveed Hussain Khowaja
 */

const mongoose = require("mongoose");
const isEmpty = require("lodash.isempty");
const { UserSchema } = require("../user/model.user");

const PostSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    images: {
      type: [String],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    likes: [String],
    comments: [String],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
