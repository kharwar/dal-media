const router = require("express").Router();
const { otpController } = require("../../controllers");

router.post("/send", otpController.sendOtp);

module.exports = router;
