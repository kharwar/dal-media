/*
 * Created on Tue Jul 05 2022
 *
 * Author: Naveed Hussain Khowaja
 */

const { postService } = require("../../services");
const { responses } = require("../../utils");
const { errorResponse, successResponse } = require("../../utils/responses");
const getAllPosts = async (req, res) => {
  res.send("Get all posts");
};

const getPostById = async (req, res) => {
  res.send("Get post by id");
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
  res.send("Update");
};

const deletePost = async (req, res) => {
  res.send("Delete");
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
};
