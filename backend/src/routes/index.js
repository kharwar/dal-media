const express = require("express");
const router = express.Router();

const userRoutes = require("./user/router.user");
const postRouter = require("./post/router.post");
const otpRouter = require("./otp/routes.otp");
// const emailRouter = require("./email/router.email");

router.use("/users", userRoutes);
router.use("/posts", postRouter);
router.use("/otp", otpRouter);
// router.use("/email", emailRouter);

module.exports = router;
