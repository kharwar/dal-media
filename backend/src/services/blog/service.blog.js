/*
 * Created on Tue Jul 8 2022
 *
 * Author: Siddharth Kharwar
 */
const { Blog } = require("../../models");
const { validations } = require("../../utils");
const createBlog = async (blogData) => {
  try {
    const blog = await Blog.create(blogData);
    return blog;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const findBlogById = async (id) => {
  try {
    const blog = await Blog.findById(id).populate("createdBy").lean();
    return blog;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const findAllBlogs = async () => {
  try {
    const blogs = await Blog.find().populate("createdBy").lean();
    return blogs;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const deleteBlogById = async (id) => {
  try {
    const blog = await Blog.findByIdAndDelete(id);
    return blog;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const updateBlog = async (id, data) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, data);
    return updatedBlog;
  } catch (error) {
    console.log(error);
    throw validations.handleErrors(error);
  }
};

module.exports = {
  createBlog,
  findBlogById,
  findAllBlogs,
  deleteBlogById,
  updateBlog,
};
