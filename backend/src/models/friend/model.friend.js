const mongoose = require("mongoose");
const { FRIENDS } = required("../../utils/constants.js");

const FriendSchema = new mongoose.Schema(
  {
    sourceUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
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
