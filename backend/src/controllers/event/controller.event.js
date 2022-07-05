const { eventService } = require("../../services");

const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.findAllEvents();
    return res.status(200).send({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }

};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventService.findEventById(id);
    if (!event) {
      return res.status(404).send({
        message: "Event not found",
        success: false,
      });
    }
    return res.status(200).send({
      success: true,
      event,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }

};

const createEvent = async (req, res) => {
  try {
    const { body } = req;
    const event = await eventService.createEvent(body);
    return res.status(200).send({
      message: "Event created",
      success: true,
      event,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }

};

const updateEvent = async (req, res) => {
  res.send("Update");
};

const deleteEvent = async (req, res) => {
  res.send("Delete");
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
};
