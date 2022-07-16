/*
  Created on July 9th 2022
  Author: Kavya Kasaraneni
*/

//Code for mailing the users for the email verification during sign up
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: "dal-media@outlook.com",
    pass: "Dalmedia2022",
  },
});

const sendMail = async (email, subject, text) => {
  let mailOptions = {
    from: "dal-media@outlook.com",
    to: email,
    subject: subject,
    html: `<p>${text}</p>`,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendMail;
