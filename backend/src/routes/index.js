const express = require("express");
const router = express.Router();

const userRoutes = require("./user/router.user");
const postRouter = require("./post/router.post");
const eventRouter = require("./event/router.event");

router.use("/users", userRoutes);
router.use("/posts", postRouter);
router.use("/events", eventRouter);

module.exports = router;
