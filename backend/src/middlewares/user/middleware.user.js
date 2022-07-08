const isAuthenticated = (req, res, next) => {
  try {
    //checks if user is authenticated
    console.log("isAuthenticated");
    next();
  } catch (error) {
    return res.status(400).send({
      message: "Authenticated Error!",
      success: false,
      error,
    });
  }
};

module.exports = {
  isAuthenticated,
};
