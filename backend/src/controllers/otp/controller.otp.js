const { errorResponse, successResponse } = require("../../utils/responses");
const moment = require("moment");
const { userService, otpService } = require("../../services");
const sendMail = require("../../utils/mailer");
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

    const emailText = `A password change request has been generated. Your password reset link is <a><u><b>${process.env.FRONTEND_BASE_URL}/change-password/${passcode}</b></u></a>. This link will expire within 30 minutes.`;
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
