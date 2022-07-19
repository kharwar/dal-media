const mongoose = require("mongoose");
const { Poll } = require("../../models");
const { validations } = require("../../utils");

const createPoll = async (pollData) => {
  try {
    const poll = await Poll.create(pollData);
    return poll;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const findAllPolls = async (groupId) => {
  try {
    const polls = await Poll.find();
    //await events.sort((a, b) => { return new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime(); });
    return polls;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

module.exports = {
  createPoll,
  findAllPolls,
};