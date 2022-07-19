/*
 * Created on Tue Jul 05 2022
 *
 * Author: Ridham Kathiriya
 */

const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    question: {
      type: String,
      required: [true, "Poll must have a question"],
    },
    option: {
      type: [String],
    },

    groupId: {
      type: String,
    },

    createBy: {
      type: String,
      requred: true,
    },

  },

  { timestamps: true }
);

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;