const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD
};

// Reference Link: https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786