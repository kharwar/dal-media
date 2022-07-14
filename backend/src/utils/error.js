// const CustomError = ({ message = "Internal Server Error", code = 500 }) => {
//   const error = new Error(message);
//   error.code = code;
//   return error;
// };

// CustomError.prototype = Object.create(Error.prototype);

// module.exports = CustomError;

class CustomError extends Error {
  constructor({ message, code }) {
    super(message);
    // this.messagmessage = message;
    this.code = code;
  }
}

module.exports = CustomError;
