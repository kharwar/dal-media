const jwt = require("jsonwebtoken");
const { User } = require("../../models/");
const { userService } = require("../../services");
const isAuthenticated = (req, res) => {
  try {
    if (!req.headers.authorization) {
      throw "Missing Authentication Token";
    }
    const decodedToken = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = userService.getUserById(decodedToken.id);
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
