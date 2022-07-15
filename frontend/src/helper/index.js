/*
  Created on July 9th 2022
  Author: Kavya Kasaraneni
*/

// const axios = require("axios");

//  async function sendEmail(email, code) {
//   try {
//     await axios.post("http://localhost:8000/api/email/email", {
//       email: email,
//       subject: "Email verification for user signup",
//       text: "To verify your account please enter the code:" + code,
//     }).then((res) => {
//       console.log("Email sent!");
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }

//  const verifyCode = (code) => {
//   const inputCode = prompt("Enter the verification code");
//   console.log(inputCode)
//   if (code == inputCode) {
//     console.log("verfied")
//     return true;
//   } else {
//     return false;
//   }
// };