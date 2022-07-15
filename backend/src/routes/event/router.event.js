/*
 * Created on Tue Jul 05 2022
 *
 * Author: Ridham Kathiriya
 */
const isAuthenticated = require("../../middlewares/common/isAuthenticated");
const eventRouter = require("express").Router();
const { eventController } = require("../../controllers");

eventRouter.get("/", isAuthenticated, eventController.getAllEvents);
eventRouter.get("/:id", isAuthenticated, eventController.getEventById);
eventRouter.post("/create", isAuthenticated,  eventController.createEvent);
eventRouter.put("/update/:id", isAuthenticated, eventController.updateEvent);
eventRouter.delete("/delete/:id", isAuthenticated, eventController.deleteEvent);
eventRouter.post("/interest",isAuthenticated, eventController.interestEvent);

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