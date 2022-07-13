const mongoose = require("mongoose");
const { User } = require("../../models");
const { validations } = require("../../utils");

const getUserById = (id) => {
  try {
    const user = User.findById(id);
    return user;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

const createUser = async(userData) => {
try{
  const user = await User.create(userData);
  return user;
}catch(error){
  throw validations.handleErrors(error);
}
}

const findUser = async(email) =>  {
try{
  const user = await User.findOne({email});
  return user;
}catch(error){
  throw validations.handleErrors(error);
}

}

// const forgotPassword = async(userData) => {
//   try{
//     const user = await User.findOneAndUpdate({email:email},{password:password})
//     return user;
//   }catch(error){
//     throw validations.handleErrors(error);
// }

const findUserById = async(id) => {
  try{
    const user = await User.findById(id);
    return user;
  }catch(error){
    throw validations.handleErrors(error);
  }
}

const updateUserById = async (id, userData) => {
  try {
    const user = await User.findByIdAndUpdate(id, userData, {
      returnDocument: "after",
    });
    return user;
  } catch (error) {
    throw validations.handleErrors(error);
  }
};

module.exports = {
  getUserById,
  createUser,
  findUser,
  findUserById,
  updateUserById
};


