import { friendService } from "../../services";
import { errorResponse, successResponse } from "../../utils/responses";
import constants from "../../utils/constants";
import { validations } from "../../utils";

const sendFriendRequest = async (req, res) => {
  try {
    const { body } = req;
    const friendData = {
      targetUser: body.targetUserId,
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
    const friend = await friendService.findFriend(
      req.user._id,
      body.targetUserId
    );

    if (!friend) {
      throw validations.handleErrors(
        new Error("No such friend request found"),
        404
      );
    }
    friend.status = constants.FRIENDS.ACCEPTED;

    await friend.save();
    return successResponse(res, "Friend Request Accepted", friend);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getMyFriends = async (req, res) => {
  try {
    const friends = await friendService.findFriendsById(
      req.user._id,
      constants.FRIENDS.ACCEPTED
    );
    return successResponse(res, "Friends Fetched", friends);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const friendRequests = await friendService.findFriendsById(
      req.user._id,
      constants.FRIENDS.PENDING
    );
    return successResponse(res, "Friend Requests Fetched", friendRequests);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  getMyFriends,
  getFriendRequests,
};
