/*
 * Created on Tue Jul 05 2022
 *
 * Author: Ridham Kathiriya
 */

const mongoose = require("mongoose");
const isEmpty = require("lodash.isEmpty");
//const { isEmpty } = lodash;
//const { UserSchema } = require("../user/model.user");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [
        true,
        "Event must have some title"
      ],
    },
    description: {
      type: String,
      required: [
        isEmpty(this.images),
        "Event must have description or atleast one image",
      ],
    },
    location: {
      type: String,
    },
    start_DT: {
      type: String,
      required: [
        true,
        "Event must have Start date"
      ],
    },
    end_DT: {
      type: String,
      required: [
        true,
        "Event must have end date"
      ],
    },

    images: {
      type: [String],
      required: [
        isEmpty(this.description),
        "Event must have description or atleast one image",
      ],
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