const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    description: String,
    images: [String],
    createBy: mongoose.Types.ObjectId,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
