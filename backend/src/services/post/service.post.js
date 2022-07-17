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

const findAllPosts = async (params) => {
  const queryParams = {};

  if (params.groupId) {
    queryParams["groupId"] = params.groupId;
  } else if (params.userId) {
    queryParams["createdBy"] = params.userId;
    queryParams["groupId"] = null;
  } else {
    queryParams["groupId"] = null;
  }

  try {
    const posts = await Post.find(queryParams)
      .sort("-createdAt")
      .populate("createdBy")
      .exec();

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

const likeDislikePost = async (data, userId) => {
  console.log({ data });
  if (data?.postId && data?.isLiked != undefined) {
    let operation = null;
    if (data.isLiked) {
      operation = { $pull: { likes: userId.toString() } };
    } else {
      operation = { $push: { likes: userId.toString() } };
    }
    try {
      const post = await Post.updateOne({ _id: data.postId }, operation, {
        returnDocument: "after",
      });
    } catch (error) {
      throw validations.handleErrors(error);
    }
  } else {
    throw validations.handleErrors(
      {
        message: "postId and isLiked are required",
      },
      401
    );
  }
};

module.exports = {
  createPost,
  findPostId,
  findAllPosts,
  updatePostById,
  deletePostById,
  likeDislikePost,
};
