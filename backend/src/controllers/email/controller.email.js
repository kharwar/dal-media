// Email tempate : https://www.regpacks.com/blog/payment-acknowledgement-email-templates/
require('dotenv').config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
        user: "dal-media@outlook.com",
        pass: "Dalmedia2022"
    }
});

const sendMail = (email, subject, text, callback) => {
    let mailOptions = {
        from: 'dal-media@outlook.com',
        to: email,
        subject: subject,
        text: text
    }
    transporter.sendMail(mailOptions, function(err, data) {
        if(err) {
            callback(err, null);
        }
        return callback(null, data);
    })
};



module.exports = {sendMail};