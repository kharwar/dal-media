const { friendService } = require("../../services");
const { errorResponse, successResponse } = require("../../utils/responses");
const constants = require("../../utils/constants");
const { validations } = require("../../utils");
const { FRIENDS } = require("../../utils/constants");

const sendFriendRequest = async (req, res) => {
  try {
    const { body } = req;
    const friendData = {
      targetUser: body.userId,
      sourceUser: req.user._id,
      status: constants.FRIENDS.PENDING,
    };
    const friend = await friendService.createFriend(friendData);
    return successResponse(res, "Friend Request Send", { success: true });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { body } = req;
    const friend = await friendService.findFriend(body.userId, req.user._id);

    if (!friend) {
      throw validations.handleErrors(
        new Error("No such friend request found"),
        404
      );
    }
    friend.status = constants.FRIENDS.ACCEPTED;

    const [_, __] = await Promise.all([
      friend.save(),
      friendService.createFriend({
        sourceUser: req.user._id,
        targetUser: body.userId,
        status: FRIENDS.ACCEPTED,
      }),
    ]);

    return successResponse(res, "Friend Request Accepted", { success: true });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getMyFriends = async (req, res) => {
  try {
    const friends = await friendService.findFriendsWhere({
      sourceUser: req.user._id,
      status: constants.FRIENDS.ACCEPTED,
    });
    const myFriends = friends.map((friend) => friend.targetUser);
    return successResponse(res, "Friends Fetched", myFriends);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const friendRequests = await friendService.findFriendsWhere({
      targetUser: req.user._id,
      status: constants.FRIENDS.PENDING,
    });

    const myFriendRequests = friendRequests.map((friend) => friend.sourceUser);
    return successResponse(res, "Friend Requests Fetched", myFriendRequests);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const denyFriendRequest = async (req, res) => {
  try {
    const { body } = req;
    const friend = await friendService.deleteOneFriendWhere({
      sourceUser: body.userId,
      targetUser: req.user._id,
      status: constants.FRIENDS.PENDING,
    });
    return successResponse(res, "Friend Request denied", { success: true });
  } catch (err) {
    return errorResponse(res, err);
  }
};

const unfriend = async (req, res) => {
  try {
    const { body } = req;
    await friendService.deleteManyFriendWhere({
      $or: [
        { $and: [{ sourceUser: body.userId }, { targetUser: req.user._id }] },
        { $and: [{ sourceUser: req.user._id }, { targetUser: body.userId }] },
      ],
    });
    return successResponse(res, "Unfriended", { success: true });
  } catch (error) {
    return errorResponse(res, err);
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  getMyFriends,
  getFriendRequests,
  denyFriendRequest,
  unfriend,
};
