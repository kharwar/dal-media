/*
 * Created on Tue Jul 05 2022
 *
 * Author: Naveed Hussain Khowaja
 */

const constants = require("./constants");

/*
  types of error can be found here
  https://mongoosejs.com/docs/api/error.html#error_Error-name
*/
const handleErrors = (error) => {
  let errors = [];
  let code = 500;

  if (error.errors) {
    for (const [key, value] of Object.entries(error.errors)) {
      const errorType = value.kind;
      code = constants[errorType];
      errors.push(value.message);
    }
  } else {
    errors.push("Internal Server Error");
  }

  return { errors, code };
};

module.exports = {
  handleErrors,
};
