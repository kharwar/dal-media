/*
 * Created on Tue Jul 05 2022
 *
 * Author: Naveed Hussain Khowaja
 */

const mongoose = require("mongoose");
const { Post } = require("../../models");
const { validations } = require("../../utils");

const createPost = async (postData, user) => {
  try {
    const post = await Post.create({ ...postData, createdBy: user });
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
    queryParams["createdBy._id"] = params.userId;
    queryParams["groupId"] = null;
  } else {
    queryParams["groupId"] = null;
  }

  try {
    const posts = await Post.find(queryParams)
      // .slice("comments", 3)
      .sort("-createdAt")
      .populate([{ path: "comments.createdBy", select: "-password" }])
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

const commentOnPost = async (data, userId) => {
  console.log({ data });
  if (data?.postId) {
    const comment = {
      $each: [
        {
          comment: data.comment,
          createdBy: userId.toString(),
        },
      ],
      $sort: { createdAt: -1 },
    };
    try {
      const post = await Post.updateOne(
        { _id: data.postId },
        {
          $push: {
            comments: comment,
          },
        },
        {
          returnDocument: "after",
        }
      );
    } catch (error) {
      throw validations.handleErrors(error);
    }
  } else {
    throw validations.handleErrors(
      {
        message: "post id is required",
      },
      401
    );
  }
};

const getComments = async (postId) => {
  try {
    const post = await Post.findOne(
      { _id: postId },
      { "comments": { $slice: 5 } }
    );

    if (post) {
      return post.comments;
    }

    return [];
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const searchPost = async (keyword) => {
  try {
    const posts = Post.find(
      { $text: { $search: keyword } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .populate("comments.createdBy");

    return posts;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

module.exports = {
  createPost,
  findPostId,
  findAllPosts,
  updatePostById,
  deletePostById,
  likeDislikePost,
  commentOnPost,
  getComments,
  searchPost,
};

// // const post = await Post.find().populate({
// //   path: "createdBy",
// //   match: {
// //     $or: [
// //       // { description: { "$regex": keyword, "$options": "i" } },
// //       { firstname: { "$regex": keyword, "$options": "i" } },
// //       { lastname: { "$regex": keyword, "$options": "i" } },
// //     ],
// //   },
// // });
