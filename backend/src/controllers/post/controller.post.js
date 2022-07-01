const getAllPosts = async (req, res) => {
  res.send("Get all posts");
};

const getPostById = async (req, res) => {
  res.send("Get post by id");
};

const createPost = async (req, res) => {
  res.send("Create");
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
