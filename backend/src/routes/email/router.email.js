const emailRouter = require("express").Router();

const {sendMail} = require("../../controllers/index").emailController;

emailRouter.post('/email', (req, res) => {
    const { subject, email, text } = req.body;
    console.log('Data: ', req.body);
    console.log(sendMail);
    sendMail(email, subject, text, function(err, data) {
        if (err) {
            console.log('ERROR: ', err);
            return res.status(500).json({ message: err.message, success: false });
        }
        console.log('Email sent!!!');
        return res.status(200).json({ message: 'Email sent successfully', success: true });
    });
});


module.exports = emailRouter;