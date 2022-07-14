const express = require("express");
const router = express.Router();

const userRoutes = require("./user/router.user");
const postRouter = require("./post/router.post");
const blogRoutes = require("./blog/router.blog");
const groupRouter = require("./group/router.group");

router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/posts", postRouter);
router.use("/groups", groupRouter);

module.exports = router;