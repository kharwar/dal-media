/*
 * Created on Tue Jul 07 2022
 *
 * Author: Tasnim Khan
 */

const mongoose = require("mongoose");
const { Group } = require("../../models");
const { validations } = require("../../utils");

const createGroup = async (groupData) => {
  try {
    const group = await Group.create(groupData);
    return group;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const findGroupId = async (id) => {
  try {
    const group = await Group.findById(id).lean();
    return group;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const getAllGroups = async () => {
  try {
    const groups = await Group.find();
    return groups;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const updateGroupById = async (id, groupData) => {
  try {
    const group = await Group.findByIdAndUpdate(id, groupData, {
      returnDocument: "after",
    });
    return group;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const deleteGroupById = async (id) => {
  try {
    const group = await Group.findByIdAndDelete(id);
    return group;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const getAllMembers = async (groupId) => {
  try {
    const group = await Group.findById(groupId).populate("members").lean();
    console.log(group);
    return group.members;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

module.exports = {
  createGroup,
  findGroupId,
  getAllGroups,
  updateGroupById,
  deleteGroupById,
  getAllMembers,
};
