const { User } = require("../../models");

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserById,
};
