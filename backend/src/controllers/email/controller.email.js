/*
  Created on July 8th 2022
  Author: Kavya Kasaraneni
*/

// Email tempate : https://www.regpacks.com/blog/payment-acknowledgement-email-templates/
require('dotenv').config();
const nodemailer = require('nodemailer');

//setting the details of email
let transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
        user: "dal-media@outlook.com",
        pass: "Dalmedia2022"
    }
});

//code for mailing the user
const sendMail = (email, subject, text, callback) => {
    let mailOptions = {
        from: 'dal-media@outlook.com',
        to: email,
        subject: subject,
        text: text
    }
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            callback(err, null);
        }
        return callback(null, data);
    })
};



module.exports = { sendMail };