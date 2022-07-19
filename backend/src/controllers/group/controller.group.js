/*
 * Created on Tue Jul 07 2022
 *
 * Author: Tasnim Khan
 */

const { groupService } = require("../../services");
const { responses } = require("../../utils");
const { errorResponse, successResponse } = require("../../utils/responses");

const getAllGroups = async (req, res) => {
  try {
    const { body } = req;
    const groups = await groupService.getAllGroups(body.userId);

    return successResponse(res, "Groups Fetched", groups);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getGroupById = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await groupService.findGroupId(id);

    return successResponse(res, "Group Fetched", group);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const createGroup = async (req, res) => {
  try {
    let { body } = req;
    const createdBy = req.user._id;
    const group = await groupService.createGroup({
      ...body,
      members: [createdBy],
      createdBy,
    });
    return successResponse(res, "Group Created", group);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const updateGroup = async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  try {
    const group = await groupService.updateGroupById(id, body);

    return successResponse(res, "Group Details Updated", group);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await groupService.deleteGroupById(id);

    return successResponse(res, "Group Deleted", group);
  } catch (error) {
    return errorResponse(res, error);
  }
};

// Members

const getAllMembers = async (req, res) => {
  const { id } = req.params;

  try {
    const groupMembers = await groupService.getAllMembers(id);

    return successResponse(res, "Groups Members Fetched", groupMembers);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getUsersToAdd = async (req, res) => {
  const { id } = req.params;
  try {
    const usersToAdd = await groupService.getUsersToAdd(id);
    return successResponse(res, "Users to Add Fetched", usersToAdd);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const addMember = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  try {
    const group = await groupService.addUserToGroup(id, body.userId);
    return successResponse(res, "Group Member Added", group);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const removeMember = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  try {
    const group = await groupService.removeMemberFromGroup(id, body.userId);
    return successResponse(res, "Group Member Removed", group);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  getAllGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  getGroupById,
  addMember,
  getUsersToAdd,
  getAllMembers,
  removeMember,
};
