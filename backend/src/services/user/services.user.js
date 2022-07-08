const { User } = require("../../models");

const getUserById = (id) => {
  try {
    const user = User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserById,
};
