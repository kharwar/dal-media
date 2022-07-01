const express = require("express");
const router = express.Router();

const userRoutes = require("./user/router.user");
const postRouter = require("./post/router.post");

router.use("/users", userRoutes);
router.use("/posts", postRouter);

module.exports = router;
