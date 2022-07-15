/*
 * Created on Tue Jul 05 2022
 *
 * Author: Ridham Kathiriya
 */
const isAuthenticated = require("../../middlewares/common/isAuthenticated");
const eventRouter = require("express").Router();
const { eventController } = require("../../controllers");

eventRouter.get("/", eventController.getAllEvents);
eventRouter.get("/:id", eventController.getEventById);
eventRouter.post("/create",  eventController.createEvent);
eventRouter.put("/update/:id", eventController.updateEvent);
eventRouter.delete("/delete/:id", eventController.deleteEvent);
eventRouter.post("/interest", eventController.interestEvent);

module.exports = eventRouter;


// URL: http://localhost:8000/api/events/create
// Body: {
//   "title":"second event",
//   "description":"description",
//   "location":"Brunswick st",
//   "start_DT":"date st",
//   "end_DT":"end dt",
//  "images":["image1","image2"],
//  "createBy":"new user",
//  "interested":["user2","user3"]
 
//    }