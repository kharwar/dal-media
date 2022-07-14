const { User } = require("../../models/user/model.user");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userService } = require("../../services");
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
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const bio = req.body.bio;
    const password = req.body.password;

    const hash = await bcrypt.hash(password, saltRounds);
    const user = await userService.createUser({
      firstname: firstname,
      lastname: lastname,
      bio: bio,
      email: email,
      password: hash,
    });
    userService.sendMail(
      "nv201655@dal.ca",
      "Email Verification",
      "Verify your mail",
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      }
    );
    return successResponse(res, "User Successfully Registered");
  } catch (error) {
    return errorResponse(res, error);
  }
};

const signIn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userService.findUser(email);
    const hash = await bcrypt.compare(password, user.password);
    if (!hash) {
      return res.status(400).send({
        message: "Unauthenticated",
      });
    }
    delete user.password;
    user.token = await userService.generateToken(user);
    return successResponse(res, "Login Successful", user);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const sendOtp = () => {};

const forgotpassword = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const hash = await bcrypt.hash(password, saltRounds);
    const update = { password: hash };

    const user = await userService.updateUserById(email, update);
    return successResponse(res, "Password reset successful", user);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const resetpassword = async (req, res) => {
  try {
    const id = req.body.user_id;
    const password = req.body.password;

    const hash = await bcrypt.hash(password, saltRounds);
    const update = { password: hash };

    const user = await userService.updatePassword(id, update);
    return successResponse(res, "Password changes updated", user);
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
  resetpassword,
  forgotpassword,
  getCurrentUser,
};
