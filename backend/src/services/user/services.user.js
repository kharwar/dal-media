require("dotenv").config();
const nodemailer = require("nodemailer");
const { User } = require("../../models");
const { validations } = require("../../utils");
const jwt = require("jsonwebtoken");
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
    const user = await User.create(userData);
    return user;
  } catch (error) {
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
    throw validations.handleErrors(error);
  }
};
const generateToken = async (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "10h" });
  return token;
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const updateUserById = async (id, userData) => {
  try {
    const user = await User.findByIdAndUpdate(id, userData, {
      returnDocument: "after",
    });
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

let transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: "dal-media@outlook.com",
    pass: "Dalmedia2022",
  },
});

const sendMail = (email, subject, text, callback) => {
  let mailOptions = {
    from: "dal-media@outlook.com",
    to: email,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      callback(err, null);
    }
    return callback(null, data);
  });
};

module.exports = {
  getUserById,
  createUser,
  findUser,
  findUserById,
  updateUserById,
  sendMail,
  updatePassword,
  forgotPassword,
  generateToken,
};
