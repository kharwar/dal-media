const jwt = require("jsonwebtoken");
const { User } = require("../../models/");
const { userService } = require("../../services");
const CustomError = require("../../utils/error");
const isAuthenticated = (req, res, next) => {
  try {
    // if (!req.headers.authorization) {
    //   throw new CustomError({
    //     message: "Missing Authentication Tokens",
    //     code: 401,
    //   });
    // }
    // const decodedToken = jwt.verify(
    //   req.headers.authorization,
    //   process.env.JWT_SECRET
    // );
    // const user = userService.getUserById(decodedToken.id);
    const user = {
      _id: "62bd105463769d18e18bc76d",
    };
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Authentication Error",
      success: false,
      error,
    });
  }
};

module.exports = isAuthenticated;
