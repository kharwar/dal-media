/*
  Created on July 9th 2022
  Author: Kavya Kasaraneni
*/

const { errorResponse, successResponse } = require("../../utils/responses");
const moment = require("moment");
const { userService, otpService } = require("../../services");
const sendMail = require("../../utils/mailer");

//Function for setting a passcode and sending it to user email address as OTP for resetting password
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userService.findUserWhere({ email });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const passcode = otpService.generatePasscode(6);
    const expiration = moment().add(30, "minutes");
    const otp = await otpService.createOtp({
      userId: user._id,
      passcode,
      expiration,
    });

    const link = '${process.env.FRONTEND_BASE_URL}/reset-password/${passcode}'
    console.log(link)
    const emailText = `A password change request has been generated. Please click <a href='${process.env.FRONTEND_BASE_URL}/reset-password/${passcode}'>here</a> to reset your password. This link will expire within 30 minutes.`;
    console.log(emailText)
    sendMail(email, "Password Verification", emailText);
    return successResponse(res, "OTP Sent", { success: true });
  } catch (error) {
    console.log(error);
    return errorResponse(res, error);
  }
};

module.exports = {
  sendOtp,
  // verifyOtp,
};
