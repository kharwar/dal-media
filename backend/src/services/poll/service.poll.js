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

module.exports = {
  createPoll,
};