import moment from "moment";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { v4 as uuid } from "uuid";
export const dateFormat = (date, format) => moment(date).format(format);

const regEx = {
  lettersOnly: /^[a-zA-Z\s]*$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@dal.ca/,
  password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&? "])[a-zA-Z0-9!#$@^%&?]{8,20}$/,
};

const isLettersOnly = (text) => regEx.lettersOnly.test(text);

const isEmailValid = (email) => regEx.email.test(email);

const isPasswordValid = (password, cpassword) => {
  //for confirm password
  if (cpassword && password === cpassword) {
    return true;
  }

  //for password
  if (password.length >= 8) {
    return true;
  }

  return false;
};

export const formValidator = (valueType, inputValue, dependantValue) => {
  switch (valueType) {
    case "firstName":
      return isLettersOnly(inputValue);

    case "lastName":
      return isLettersOnly(inputValue);

    case "email":
      return isEmailValid(inputValue);

    case "password":
      return isPasswordValid(inputValue);

    case "cpassword":
      if (!dependantValue) return false;
      return isPasswordValid(inputValue, dependantValue);

    default:
      return true;
  }
};

export const formValidationMsgs = (valueType, inputValue) => {
  if (!inputValue) {
    return "This field is required";
  }

  switch (valueType) {
    case "firstName":
      return "First name must contain letters only";

    case "lastName":
      return "Last name must contain letters only";

    case "email":
      return "Email format is invalid";

    case "password":
      return "Password must have atleast eight characters";

    case "cpassword":
      return "Password and confirm password does not match";

    default:
      return "Invalid input";
  }
};

export const uploadFile = async (file) => {
  const filePath = "/img/" + uuid() + file.name;
  const storageRef = ref(storage, filePath);
  let imageUrl = null;
  try {
    await uploadBytes(storageRef, file);
    imageUrl = await getDownloadURL(storageRef);
  } catch (error) {
    throw error;
  }

  return imageUrl;
};
