const { User } = require("../../models/user/model.user");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userService } = require("../../services");
const saltRounds = 10;
const { errorResponse, successResponse } = require("../../utils/responses");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    return res.status(200).send({
      message: "Users fetched",
      success: true,
      users: [{}],
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const signup = async (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const bio = req.body.bio;
    const password = req.body.password;
    
    const hash = await bcrypt.hash(password, saltRounds)
    const user = await userService.createUser({
      firstname: firstname,
      lastname: lastname,
      bio: bio,
      email: email,
      password: hash,
    })
    return successResponse(res, "User Successfully Registered");
  } catch (error) {
    return errorResponse(res, error);
  }
}

const signin = async (req, res) => {

  try{

    const email = req.body.email;
    const password = req.body.password;
    
    const user = await userService.findUser(email)
    const hash = await bcrypt.compare(password, user.password)
    console.log(hash);
    if(hash){

      const logintoken= jwt.sign({email:email, user_id: user._id}, process.env.JWT_SECRET,{expiresIn: "10hr"});   
      user.token = logintoken;
      // hash
      // .cookie("token", logintoken, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "none",
      // })
      // .send();
      return successResponse(res, "Login Successfull", logintoken);
    }
    
  }catch(error){
    return errorResponse(res, error);
  }
}

// const forgotpassword = async (req, res) => {
// try{
//     const email= req.body.email;
//     const password = req.body.password;

// }catch(error){
//   return errorResponse(res, error);
// }
// }

const getUserProfile = async (req,res) => {
  try{
  const id = req.body.user_id;
  const user = await userService.findUserById(id);
  return successResponse(res, "User details: ", user);
  }catch(error){
    return errorResponse(res, error);
  }

}

const updateProfile = async (req,res) => {
try{
    const id = req.body.user_id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const bio = req.body.bio;

    const update = {
      email: email,
      firstname : firstname,
      lastname: lastname,
      bio : bio
    }

    const user = await userService.updateUserById(id, update)

   return successResponse(res, "User Details updated succesfully", user);
}catch(error){
  return errorResponse(res, error);
}
}

module.exports = { getUsers, signup, signin, getUserProfile, updateProfile };
