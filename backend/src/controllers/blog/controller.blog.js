/*
 * Created on Tue Jul 8 2022
 *
 * Author: Siddharth Kharwar
 */
const { blogService } = require("../../services");
const { validations } = require("../../utils");
const { successResponse, errorResponse } = require("../../utils/responses");
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogService.findBlogById(id);
    if (!blog) {
      throw validations.handleErrors(new Error("Blog not found"));
    }
    return successResponse(res, "Blog Found", blog);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const createBlog = async (req, res) => {
  try {
    let { body } = req;
    const createdBy = req.user._id;
    if (!body.image) {
      delete body.image;
    }
    const blog = await blogService.createBlog({ ...body, createdBy });
    return successResponse(res, "Blog Created", blog);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.findAllBlogs();
    return successResponse(res, "Blogs Found", { blogs });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogService.deleteBlogById(id);
    return successResponse(res, "Blog Deleted", blog);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const updateBlog = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const { createdBy } = await blogService.findBlogById(id);

    if (req.user._id.toString() != createdBy?._id.toString()) {
      throw validations.handleErrors(new Error("Unauthorized"), 401);
    }
    blog = await blogService.updateBlog(id, body);
    return successResponse(res, "Blog Updated", blog);
  } catch (error) {
    console.log(error);
    return errorResponse(res, error);
  }
};

module.exports = {
  createBlog,
  getBlogById,
  getAllBlogs,
  deleteBlog,
  updateBlog,
};
