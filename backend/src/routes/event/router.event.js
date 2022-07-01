const eventRouter = require("express").Router();
const { eventController } = require("../../controllers");

eventRouter.get("/", eventController.getAllEvents);
eventRouter.get("/:id", eventController.getEventById);
eventRouter.post("/create", eventController.createEvent);
eventRouter.put("/update/:id", eventController.updateEvent);
eventRouter.delete("/delete/:id", eventController.deleteEvent);

module.exports = eventRouter;