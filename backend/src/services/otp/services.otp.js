const { Otp } = require("../../models");
const { validations } = require("../../utils");
const moment = require("moment");
const generatePasscode = (length) => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  passcode = "";
  for (let i = 0; i < length; i++) {
    passcode += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return passcode;
};

const createOtp = async (otpData) => {
  try {
    const otp = await Otp.create(otpData);
    return otp;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const findOtpByPasscode = async (passcode) => {
  try {
    const otp = await Otp.findOne({
      passcode,
      expiration: {
        $gte: Date.now(),
      },
      expired: false,
    }).lean();
    return otp;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const updateOtp = async (id, otpData) => {
  try {
    const updatedOtp = await Otp.findByIdAndUpdate(id, otpData);
    return updateOtp;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

module.exports = {
  createOtp,
  generatePasscode,
  updateOtp,
  findOtpByPasscode,
};
