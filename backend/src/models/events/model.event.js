/*
 * Created on Tue Jul 05 2022
 *
 * Author: Ridham Kathiriya
 */

const mongoose = require("mongoose");
//const { UserSchema } = require("../user/model.user");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    start_DT: {
      type: String,
      required: [true, "Event must have Start date"],
    },
    end_DT: {
      type: String,
      required: [true, "Event must have end date"],
    },

    images: {
      type: [String],
    },

    createBy: {
      type: String,
      requred: true,
    },

    interested: [String],
  },

  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
