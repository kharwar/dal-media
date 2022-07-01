const getAllEvents = async (req, res) => {
  res.send("Get all events");
};

const getEventById = async (req, res) => {
  res.send("Get event by id");
};

const createEvent = async (req, res) => {
  res.send("Create");
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
