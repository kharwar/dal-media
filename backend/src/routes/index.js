const express = require("express");
const router = express.Router();

const userRoutes = require("./user/router.user");
const postRouter = require("./post/router.post");
const blogRoutes = require("./blog/router.blog");

router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/posts", postRouter);

module.exports = router;
