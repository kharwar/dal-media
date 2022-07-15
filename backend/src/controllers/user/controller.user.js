const { User } = require("../../models/user/model.user");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { userService, otpService } = require("../../services");
const sendMail = require("../../utils/mailer");
const saltRounds = 10;
const { errorResponse, successResponse } = require("../../utils/responses");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    return res.status(200).send({
      message: "Users fetched",
      success: true,
      users: [{}],
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const signUp = async (req, res) => {
  try {
    const { body } = req;
    const hash = await bcrypt.hash(body.password, saltRounds);
    body.password = hash
    delete body.password;
    const user = await userService.createUser({ ...body, password: hash });
    delete user.password;
    user.token = await userService.generateToken(user);

    return successResponse(res, "User Successfully Registered", user);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const signIn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userService.findUser(email);
    const hash = await bcrypt.compareSync(password, user.password);
    if (!hash) {
      return res.status(400).send({
        message: "Unauthenticated",
      });
    }
    delete user.password;
    user.token = await userService.generateToken(user);
    return successResponse(res, "Login Successful", user);
  } catch (error) {
    console.log({ eeeee: error });
    return errorResponse(res, error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, password } = req.body;
    const user = await userService.findUserById(req.user._id);
    const isPasswordCorrect = bcrypt.compareSync(currentPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).send({ 
        message: "Old Password incorrect",
        success: false,
      });
    }
    const newHashedPassword = await bcrypt.hash(password, saltRounds);
    userService.updateUserById(user._id, { password: newHashedPassword });
    return successResponse(res, "Password changed successfully", {
      success: true,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { passcode, password } = req.body;
    const otp = await otpService.findOtpByPasscode(passcode);
    if (!otp) {
      return res.status(404).send({
        message: "Verification link expired",
        success: false,
      });
    }
    const [updatedOtp, user, hash] = await Promise.all([
      otpService.updateOtp(otp._id, { isVerified: true }),
      userService.findUserById(otp.userId),
      bcrypt.hash(password, saltRounds),
    ]);
    const update = { password: hash };
    const updatedUser = await userService.updateUserById(user._id, update);
    return successResponse(res, "Password reset successful", { success: true });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findUserById(id);
    return successResponse(res, "User details: ", user);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.body.user_id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const bio = req.body.bio;

    const update = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      bio: bio,
    };

    const user = await userService.updateUserById(id, update);

    return successResponse(res, "User Details updated succesfully", user);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getCurrentUser = (req, res) => {
  try {
    return successResponse(res, "User Found", req.user);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  getUsers,
  signUp,
  signIn,
  getUserProfile,
  updateProfile,
  resetPassword,
  getCurrentUser,
  changePassword,
};
