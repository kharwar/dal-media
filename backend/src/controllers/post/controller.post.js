/*
 * Created on Tue Jul 05 2022
 *
 * Author: Naveed Hussain Khowaja
 */

const isEmpty = require("lodash.isempty");
const { postService } = require("../../services");
const { responses } = require("../../utils");
const { errorResponse, successResponse } = require("../../utils/responses");

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.findAllPosts(req.query);

    return successResponse(res, "Posts Fetched", posts);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postService.findPostId(id);

    return successResponse(res, "Post Fetched", post);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const createPost = async (req, res) => {
  try {
    const { body, user } = req;

    if (isEmpty(body.description) && isEmpty(body.images)) {
      const error = {
        code: 400,
        errors: ["Post must have description or atleast one image"],
      };
      return errorResponse(res, error);
    }
    const newPost = await postService.createPost(body, user);
    return successResponse(res, "Post Created", newPost);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const updatePost = async (req, res) => {
  const { body } = req;

  try {
    const post = await postService.updatePostById(body);

    return successResponse(res, "Post Deleted", post);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const deletePost = async (req, res) => {
  const { body } = req;

  try {
    const post = await postService.deletePostById(body.id);

    return successResponse(res, "Post Deleted", post);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const likeDislikePost = async (req, res) => {
  const { body, user } = req;

  try {
    const post = await postService.likeDislikePost(body, user._id);

    return successResponse(res, "Success", post);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const commentOnPost = async (req, res) => {
  const { body, user } = req;

  try {
    const post = await postService.commentOnPost(body, user._id);

    return successResponse(res, "Success", post);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getComments = async (req, res) => {
  const { postId } = req.query;
  try {
    const comments = await postService.getComments(postId);

    return successResponse(res, "Success", comments);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const searchPost = async (req, res) => {
  const { keyword } = req.query;
  try {
    const posts = await postService.searchPost(keyword);

    return successResponse(res, "Success", posts);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
  likeDislikePost,
  commentOnPost,
  getComments,
  searchPost,
};
