/*
 * Created on Tue Jul 07 2022
 *
 * Author: Tasnim Khan
 */

const { fileService } = require("../../services");
const { responses } = require("../../utils");
const { errorResponse, successResponse } = require("../../utils/responses");

const getAllFiles = async (req, res) => {
  let { groupId } = req.params;
  try {
    const files = await fileService.getAllFiles(groupId);
    return successResponse(res, "Files Fetched", files);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const createFile = async (req, res) => {
  try {
    let { body } = req;
    const uploadedBy = req.user._id;
    const file = await fileService.createFile({
      ...body,
      uploadedBy,
    });
    return successResponse(res, "File Created", file);
  } catch (error) {
    return errorResponse(res, error);
  }
};
const deleteFile = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await fileService.deleteFileById(id);

    return successResponse(res, "File Deleted", file);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  getAllFiles,
  createFile,
  deleteFile,
};
