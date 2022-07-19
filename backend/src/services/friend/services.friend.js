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

const deleteOneFriendWhere = async (where) => {
  try {
    const friend = await Friend.deleteOne(where);
    return friend;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const deleteManyFriendWhere = async (where) => {
  try {
    const friend = await Friend.deleteMany(where);
    return friend;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};
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

const findFriendsWhere = async (where) => {
  try {
    const friends = await Friend.find(where)
      .populate("targetUser")
      .populate("sourceUser");
    return friends;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};
module.exports = {
  createFriend,
  findFriend,
  findFriendsWhere,
  deleteOneFriendWhere,
  deleteManyFriendWhere,
};
