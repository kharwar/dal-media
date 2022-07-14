/*
 * Created on Tue Jul 05 2022
 *
 * Author: Naveed Hussain Khowaja
 */

/*
  types of error can be found here
  https://mongoosejs.com/docs/api/error.html#error_Error-name
*/
const handleErrors = (error, code = 500) => {
  error.code = code;
  return error;
};

module.exports = {
  handleErrors,
};
