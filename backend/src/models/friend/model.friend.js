const mongoose = require("mongoose");
const { FRIENDS } = require("../../utils/constants.js");

const FriendSchema = new mongoose.Schema(
  {
    sourceUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: [FRIENDS.PENDING, FRIENDS.ACCEPTED],
      default: FRIENDS.PENDING,
      required: true,
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;
