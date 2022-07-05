/*
 * Created on Tue Jul 05 2022
 *
 * Author: Naveed Hussain Khowaja
 */

const { postService } = require("../../services");
const { responses } = require("../../utils");
const { errorResponse, successResponse } = require("../../utils/responses");

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.findAllPosts();

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
    const { body } = req;
    const newPost = await postService.createPost(body);

    return successResponse(res, "Post Created", newPost);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const updatePost = async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  try {
    const post = await postService.updatePostById(id, body);

    return successResponse(res, "Post Deleted", post);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postService.deletePostById(id);

    return successResponse(res, "Post Deleted", post);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const likePost = async (req, res) => {
  const { body } = req;

  try {
    const post = await postService.likeOrDislikePost(body);

    return successResponse(res, "Post Deleted", post);
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
  likePost,
};
