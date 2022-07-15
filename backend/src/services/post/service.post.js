/*
 * Created on Tue Jul 05 2022
 *
 * Author: Naveed Hussain Khowaja
 */

const mongoose = require("mongoose");
const { Post } = require("../../models");
const { validations } = require("../../utils");

const createPost = async (postData) => {
  try {
    const post = await Post.create(postData);
    return post;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const findPostId = async (id) => {
  try {
    const post = await Post.findById(id).lean();
    return post;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const findAllPosts = async () => {
  try {
    const posts = Post.find().sort("-createdAt").populate("createdBy").exec();
    return posts;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const updatePostById = async (postData) => {
  try {
    const post = await Post.findByIdAndUpdate(postData.id, postData, {
      returnDocument: "after",
    })
      .populate("createdBy")
      .exec();
    return post;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const deletePostById = async (id) => {
  console.log({ id });
  try {
    const post = await Post.findByIdAndDelete(id);
    return post;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const likeOrDislikePost = async (likeData) => {
  console.log({ likeData });
  if (likeData.postId && likeData.isLiked != undefined) {
  }
};

module.exports = {
  createPost,
  findPostId,
  findAllPosts,
  updatePostById,
  deletePostById,
  likeOrDislikePost,
};
