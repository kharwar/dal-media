const express = require("express");
const router = express.Router();

const userRoutes = require("./user/router.user");
const postRouter = require("./post/router.post");
const groupRouter = require("./group/router.group");

router.use("/users", userRoutes);
router.use("/posts", postRouter);
router.use("/groups", groupRouter);

module.exports = router;