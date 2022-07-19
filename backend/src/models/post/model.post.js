/*
 * Created on Tue Jul 05 2022
 *
 * Author: Naveed Hussain Khowaja
 */

const mongoose = require("mongoose");
const { CommentSchema } = require("./model.comment");
const { UserSchema } = require("../user/model.user");

const createdBySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const PostSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    images: {
      type: [String],
    },
    createdBy: createdBySchema,
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "User id is required"],
    // },
    groupId: {
      type: String,
    },
    likes: [String],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

PostSchema.index({
  "description": "text",
  "createdBy.firstname": "text",
  "createdBy.lastname": "text",
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
