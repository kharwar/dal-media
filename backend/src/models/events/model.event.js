const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(



);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;