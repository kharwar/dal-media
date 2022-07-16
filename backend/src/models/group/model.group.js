/*
 * Created on Tue Jul 07 2022
 *
 * Author: Tasnim Khan
 */

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    members: {
      type: [Schema.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
