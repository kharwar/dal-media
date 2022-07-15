/*
  Created on June 4th 2022
  Author: Kavya Kasaraneni
*/

import React, { useContext, useState } from "react";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Box,
  TextField,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { formValidationMsgs, formValidator } from "../../utils";
import { grey } from "@mui/material/colors";
import { AuthContext } from "../../context";
import { apiRoutes, ServiceManager } from "../../services";
import { snackbar } from "../../components";
import { storeLoggedInUser } from "../../local-storage";

//Code for implementing front end for forgot password
const ForgotPassword = () => {
  const { setLoggedInUser } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    setErrors({});

    let errors = {};
    const data = {};

    const value = formdata.get("email").toString().trim();
    data["email"] = value;

    const isValid = formValidator("email", value);

    if (!isValid) {
      errors["email"] = formValidationMsgs("email", value);
    }

    const isError = Object.keys(errors).length === 0;

    if (!isError) {
      setErrors(errors);
    }

    //Call backend api for sending mail to user to reset the password
    const params = {
      email: data.email,
    };

    try {
      const res = await ServiceManager.getInstance().request(
        apiRoutes.forgotPassword,
        params,
        "post"
      );

      if (res.data) {

        snackbar.current.showSnackbar(true, "Email sent successfully");
      }
    } catch (error) {
      snackbar.current.showSnackbar(true, "Authentication Failed");
    }
  };

  //UI for forgot password
  return (
    <Container component="main" maxWidth="sm">
      <Paper sx={{ p: 8, mt: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LockRoundedIcon />
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Typography textAlign={"center"} color={grey[700]} mt={2}>
            Enter the email address associated with your account.
          </Typography>
          <Typography textAlign={"center"} color={grey[700]}>
            We will email you a link to reset your password.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
