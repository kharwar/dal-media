const mongoose = require("mongoose");

//Sample User Schema for example (Not a final model)
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Please Enter Email Address",
    match: [/^\w+([\.-]?\w+)@dal.ca/, "Enter the Valid email Address"],
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  image: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
