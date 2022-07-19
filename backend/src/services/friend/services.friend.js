const { Friend } = require("../../models");
const { validations } = require("../../utils");

const createFriend = async (friendData) => {
  try {
    const friend = await Friend.create(friendData);
    return friend;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

// const updateFriend = async (id, friendData) => {

// }

const findFriend = async (sourceUserId, targetUserId) => {
  try {
    const friend = await Friend.findOne({
      sourceUser: sourceUserId,
      targetUser: targetUserId,
    });
    return friend;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const findFriendsById = async (userId, status) => {
  try {
    const friends = await Friend.find({
      sourceUser: userId,
      status,
    });
    return friends;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};
module.exports = {
  createFriend,
  findFriend,
  findFriendsById,
};
