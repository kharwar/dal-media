/*
 * Created on Tue Jul 8 2022
 *
 * Author: Siddharth Kharwar
 */
const jwt = require("jsonwebtoken");
const { userService } = require("../../services");
const { validations } = require("../../utils");
const { errorResponse } = require("../../utils/responses");
const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw validations.handleErrors(
        new Error("Missing Authentication Tokens"),
        401
      );
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
    } catch (error) {
      throw validations.handleErrors(new Error("Authentication Error"), 401);
    }
    const user = await userService.getUserById(decodedToken._id);

    user && delete user.password;
    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = isAuthenticated;
