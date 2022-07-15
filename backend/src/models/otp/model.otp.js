const mongoose = require("mongoose");

//Sample User Schema for example (Not a final model)
const OtpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  passcode: {
    type: String,
    required: true,
  },
  expiration: {
    type: Date,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Otp = mongoose.model("Otp", OtpSchema);

module.exports = Otp;
