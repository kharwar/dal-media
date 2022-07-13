import Axios from "axios";

export async function sendEmail(email, code) {
  try {
    await Axios.post("http://localhost:8000/api/email/email", {
      email: email,
      subject: "Verification Email",
      text: "Verification Code:" + code,
    }).then((res) => {
      console.log("Email sent!");
    });
  } catch (err) {
    console.error(err);
  }
}

export const verifyCode = (code) => {
  const enteredCode = prompt("Enter the verification code");
  if (code === enteredCode) {
    return true;
  } else {
    return false;
  }
};