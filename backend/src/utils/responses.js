/*
 * Created on Tue Jul 05 2022
 *
 * Author: Naveed Hussain Khowaja
 */

const successResponse = (res, message = "", data) => {
  if (res) {
    const response = { message: message, success: true };
    if (data) {
      response["data"] = data;
    }
    return res.status(200).send(response);
  }
};

const errorResponse = (res, error) => {
  console.log(error);
  if (res) {
    return res.status(error.code ?? 500).send({
      message: error.message ?? "Internal Server Error",
      success: false,
    });
  }
};

module.exports = {
  successResponse,
  errorResponse,
};
