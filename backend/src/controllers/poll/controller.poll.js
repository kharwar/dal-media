const { pollService } = require("../../services");
const { responses } = require("../../utils");
const { errorResponse, successResponse } = require("../../utils/responses");
const isEmpty = require("lodash.isempty");


const createPoll = async (req, res) => {
  try {
    const { body } = req;

    if (isEmpty(body.title) && isEmpty(body.question)) {
      const error = {
        code: 400,
        errors: ["Poll must have title or atleast one question"],
      };
      return errorResponse(res, error);
    }
    //console.log(req);
    const poll = await pollService.createPoll(body);

    return successResponse(res, "poll Created", poll);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getAllPolls = async (req, res) => {
  try {
    const polls = await pollService.findAllPolls();

    return successResponse(res, "Polls Fetched", polls);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  createPoll,
  getAllPolls,
};