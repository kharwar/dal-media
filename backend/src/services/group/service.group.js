/*
 * Created on Tue Jul 07 2022
 *
 * Author: Tasnim Khan
 */

const mongoose = require("mongoose");
const { Group } = require("../../models");
const { User } = require("../../models");
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
    return group.members;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const getUsersToAdd = async (groupId) => {
  try {
    const group = await Group.findById(groupId).populate("members").lean();
    const members = group.members;
    const users = await User.find().lean();
    return users.filter((user) => {
      return !members.find((member) => {
        return member.email === user.email;
      });
    });
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const addUserToGroup = async (groupId, userId) => {
  try {
    const group = await Group.findById(groupId);
    group.members.push(userId);
    await group.save();
    // const updatedGroup = await Group.save(group);
    return group;
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
  getUsersToAdd,
  addUserToGroup,
};
