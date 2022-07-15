/*
 * Created on Fri Jul 15 2022
 *
 * Author: Tasnim Khan
 */

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const File = mongoose.model("File", FileSchema);

module.exports = File;
