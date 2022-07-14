const jwt = require("jsonwebtoken");
const { userService } = require("../../services");
const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw "Missing Authentication Token";
    }
    const decodedToken = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await userService.getUserById(decodedToken._id.toString());
    delete user.password;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "Authentication Error",
      success: false,
      error,
    });
  }
};

module.exports = isAuthenticated;