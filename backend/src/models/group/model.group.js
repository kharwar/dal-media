/*
 * Created on Tue Jul 07 2022
 *
 * Author: Tasnim Khan
 */

const mongoose = require("mongoose");
const isEmpty = require("lodash.isempty");
const { UserSchema } = require("../user/model.user");

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [isEmpty(this.name), "Group must have name"],
    },
    description: {
      type: String,
      required: [isEmpty(this.description), "Group must have description"],
    },
    createBy: {
      type: mongoose.Types.ObjectId,
      requred: true,
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
