/*
 * Created on Tue Jul 07 2022
 *
 * Author: Tasnim Khan
 */

const mongoose = require("mongoose");
const { Group } = require("../../models");
const { User } = require("../../models");
const { findById } = require("../../models/group/model.group");
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

const getAllGroups = async (userId) => {
  try {
    // const groups = await Group.find({members: {$contains: mongoose.Schema.Types.ObjectId(userId)}});
    const groups = await Group.find().populate({
      path: "createdBy",
      select: "-password",
    });
    const userGroups = [];
    for (let group of groups) {
      for (let member of group.members) {
        if (member.toString() === userId) {
          userGroups.push(group);
        }
      }
    }
    return userGroups;
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
    await (await group.save()).populate("members");

    return group;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const removeMemberFromGroup = async (groupId, userId) => {
  try {
    const group = await Group.findById(groupId);
    group.members = group.members.filter(
      (member) => member._id.toString() !== userId
    );
    await group.save();
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
  removeMemberFromGroup,
};
