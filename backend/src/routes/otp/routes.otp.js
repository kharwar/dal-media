/*
  Created on July 9th 2022
  Author: Kavya Kasaraneni
*/

//route for mailing user. Used in forgot password to send mail
const router = require("express").Router();
const { otpController } = require("../../controllers");

router.post("/send", otpController.sendOtp);

module.exports = router;
