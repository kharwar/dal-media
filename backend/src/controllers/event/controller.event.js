/*
 * Created on Tue Jul 05 2022
 *
 * Author: Ridham Kathriya
 */

const isEmpty = require("lodash.isempty");
const { eventService } = require("../../services");
const { responses } = require("../../utils");
const { errorResponse, successResponse } = require("../../utils/responses");

const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.findAllEvents();

    return successResponse(res, "Events Fetched", events);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await eventService.findEventById(id);

    return successResponse(res, "Event Fetched", event);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const createEvent = async (req, res) => {
  try {
    const { body } = req;

    if (isEmpty(body.description) && isEmpty(body.images)) {
      const error = {
        code: 400,
        errors: ["Event must have description or atleast one image"],
      };
      return errorResponse(res, error);
    }
    //console.log(req);
    const event = await eventService.createEvent(body);

    return successResponse(res, "Event Created", event);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const updateEvent = async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  try {
    const event = await eventService.updateEventById(id, body);

    return successResponse(res, "Event Updated", event);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await eventService.deleteEventById(id);

    return successResponse(res, "Event Deleted", event);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const interestEvent = async (req, res) => {
  const { body } = req;

  try {
    const event = await eventService.interestOrDisinterestEvent(body);

    return successResponse(res, "Event interest response", event);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  interestEvent,
};
