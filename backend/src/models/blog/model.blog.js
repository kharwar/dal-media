/*
 * Created on Tue Jul 8 2022
 *
 * Author: Siddharth Kharwar
 */
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000",
    },
    createdBy: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
