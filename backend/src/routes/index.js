const express = require("express");
const router = express.Router();

const userRoutes = require("./user/router.user");
const postRouter = require("./post/router.post");
const eventRouter = require("./event/router.event");
const blogRoutes = require("./blog/router.blog");
const groupRouter = require("./group/router.group");
const fileRouter = require("./file/router.file");
const otpRouter = require("./otp/routes.otp");
const pollRouter = require("./poll/router.poll");
const friendRouter = require("./friend/router.friend");

router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/posts", postRouter);
router.use("/events", eventRouter);
router.use("/otp", otpRouter);
// router.use("/email", emailRouter);
router.use("/groups", groupRouter);
router.use("/files", fileRouter);
router.use("/polls", pollRouter);
router.use("/friends", friendRouter);

module.exports = router;