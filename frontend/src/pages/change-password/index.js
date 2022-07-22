/*
  Created on June 7th 2022
  Author: Kavya Kasaraneni
*/

import React, { useContext, useState } from "react";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { useNavigate } from "react-router-dom";
import {
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  TextField,
  Box,
  Grid,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { formValidationMsgs, formValidator } from "../../utils";
import { AuthContext } from "../../context";
import { apiRoutes, ServiceManager } from "../../services";
import { snackbar } from "../../components";
import { storeLoggedInUser } from "../../local-storage";

//front end for the changing and updating the password for user
const ChangePassword = () => {
  const { setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);

    // setApiError(null);
    setErrors({});

    let errors = {};
    const data = {};

    formdata.forEach((formValue, key) => {
      const value = formValue.toString().trim();
      data[key] = value;

      let isValid = false;

      if (key === "cpassword") {
        const password = formdata.get("password")?.toString() ?? "";
        isValid = formValidator(key, password, value);
      } else {
        isValid = formValidator(key, value);
      }

      if (!isValid) {
        errors[key] = formValidationMsgs(key, value);
      }
    });

    const isError = Object.keys(errors).length === 0;

    if (!isError) {
      setErrors(errors);
    }

    //calling backend api for implementing the feature

    const params = {
      currentPassword: data.currentpassword,
      password: data.password,
    };

    try {
      const res = await ServiceManager.getInstance().request(
        apiRoutes.changePassword,
        params,
        "post"
      );

      if (res.data.success) {
        // ServiceManager.getInstance().userToken = res.data.token;
        // storeLoggedInUser(res.data.token);
        // setLoggedInUser(res.data);
        snackbar.current.showSnackbar(true, "Password changed succesfully");
        navigate("/profile", { replace: true });
      }
    } catch (error) {
      snackbar.current.showSnackbar(true, "Invalid Current Password");
    }
  };

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
            Change Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <TextField
              required
              fullWidth
              name="currentpassword"
              label="Current Password"
              type="password"
              id="currentpassword"
              error={!!errors.currentpassword}
              helperText={errors.currentpassword}
              sx={{ mb: 2 }}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 2 }}
            />
            <TextField
              required
              fullWidth
              name="cpassword"
              label="Confirm Password"
              type="password"
              id="cpassword"
              autoComplete="new-password"
              error={!!errors.cpassword}
              helperText={errors.cpassword}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
