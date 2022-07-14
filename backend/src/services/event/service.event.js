/*
 * Created on Tue Jul 05 2022
 *
 * Author: Ridham Kathiriya
*/

const mongoose = require("mongoose");
const { Event } = require("../../models");
const { validations } = require("../../utils");

const createEvent = async (eventData) => {
  try {
    const event = await Event.create(eventData);
    return event;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const findEventById = async (id) => {
  try {
    const event = await Event.findById(id).lean();
    return event;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const findAllEvents = async () => {
  try {
    const events = await Event.find();
    //await events.sort((a, b) => { return new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime(); });
    return events;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const updateEventById = async (id, eventData) => {
  try {
    const event = await Event.findByIdAndUpdate(id, eventData, {
      returnDocument: "after",
    });
    return event;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const deleteEventById = async (id) => {
  try {
    const event = await Event.findByIdAndDelete(id);
    return event;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const interestOrDisinterestEvent = async (interestData) => {
  console.log({ interestData });
};

module.exports = {
  createEvent,
  findEventById,
  findAllEvents,
  updateEventById,
  deleteEventById,
  interestOrDisinterestEvent,
};


