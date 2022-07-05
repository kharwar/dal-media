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
      required: [
        isEmpty(this.images),
        "Post must have description or atleast one image",
      ],
    },
    images: {
      type: [String],
      required: [
        isEmpty(this.description),
        "Post must have description or atleast one image",
      ],
    },
    createBy: {
      type: mongoose.Types.ObjectId,
      requred: true,
    },
    likes: [String],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
