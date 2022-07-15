/*
 * Created on Tue Jul 07 2022
 *
 * Author: Tasnim Khan
 */

const mongoose = require("mongoose");
const { File } = require("../../models");
const { validations } = require("../../utils");

const createFile = async (fileData) => {
  try {
    const file = await File.create(fileData);
    return file;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const getAllFiles = async (groupId) => {
  try {
    const files = await File.find({ groupId: groupId })
      .populate("uploadedBy")
      .lean();
    return files;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const deleteFileById = async (id) => {
  try {
    const file = await File.findByIdAndDelete(id);
    return file;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

module.exports = {
  createFile,
  getAllFiles,
  deleteFileById,
};
