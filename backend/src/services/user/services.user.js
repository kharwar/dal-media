/*
  Created on July 5th 2022
  Author: Kavya Kasaraneni
*/

require("dotenv").config();
const nodemailer = require("nodemailer");
const { User } = require("../../models");
const { validations } = require("../../utils");
const jwt = require("jsonwebtoken");

//Services used to query to fetch, create, update the details in database.
const getUserById = async (id) => {
  try {
    const user = await User.findById(id).lean();
    return user;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const createUser = async (userData) => {
  try {
    const isUserExist = await User.findOne({ email: userData.email });
    if (isUserExist) {
      throw new Error("This email is already taken");
    }

    const user = await User.create(userData);
    return user.toJSON();
  } catch (error) {
    console.log(error);
    throw validations.handleErrors(error);
  }
};

const findUser = async (email) => {
  try {
    const user = await User.findOne({ email }).lean();
    return user;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const forgotPassword = async (email, userData) => {
  try {
    const user = await User.findOneAndUpdate({ email: email }, userData, {
      returnDocument: "after",
    });
    return user;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const findUserWhere = async (whereCond) => {
  try {
    const user = await User.findOne(whereCond).lean();
    return user;
  } catch (error) {
    console.log(error);
    throw validations.handleErrors(error);
  }
};
const generateToken = async (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "10h" });
  return token;
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id).lean();
    return user;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const updateUserById = async (userData) => {
  console.log({ userData });
  try {
    const user = await User.findByIdAndUpdate(userData.id, userData, {
      returnDocument: "after",
    });
    console.log({ user })
    return user;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const updatePassword = async (id, userData) => {
  try {
    const user = await User.findByIdAndUpdate(id, userData, {
      returnDocument: "after",
    });
    return user;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

module.exports = {
  getUserById,
  createUser,
  findUser,
  findUserById,
  updateUserById,
  updatePassword,
  forgotPassword,
  generateToken,
  findUserWhere,
};
