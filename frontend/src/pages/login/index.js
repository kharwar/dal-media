/*
  Created on June 3rd 2022
  Author: Kavya Kasaraneni
*/

import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Link,
  Paper,
  Stack,
} from "@mui/material";
import { formValidationMsgs, formValidator } from "../../utils";
import { AuthContext } from "../../context";
import { apiRoutes, ServiceManager } from "../../services";
import { snackbar } from "../../components";
import { setLoggedInUser, storeLoggedInUser } from "../../local-storage";

//Front end code for implementing user login into the application
const Login = () => {
  const { setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);

    setErrors({});

    let errors = {};
    const data = {};

    formdata.forEach((formValue, key) => {
      const value = formValue.toString().trim();
      data[key] = value;

      const isValid = formValidator(key, value);

      if (!isValid) {
        errors[key] = formValidationMsgs(key, value);
      }
    });

    const isError = Object.keys(errors).length === 0;

    if (!isError) {
      setErrors(errors);
      return;
    }

    setLoading(true);

    //Backend Api call for implementing feature
    const params = {
      email: data.email,
      password: data.pass,
    };

    try {
      const res = await ServiceManager.getInstance().request(
        apiRoutes.signIn,
        params,
        "post"
      );

      if (res.data.token) {
        ServiceManager.getInstance().userToken = res.data.token;
        storeLoggedInUser(res.data.token);
        setLoggedInUser(res.data);
        setLoading(false);
        navigate("/", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      snackbar.current.showSnackbar(true, "Authentication Failed");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  //UI for login
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
            Login
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />
            <TextField
              required
              fullWidth
              name="pass"
              label="Password"
              type="password"
              id="pass"
              error={!!errors.pass}
              helperText={errors.pass}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Link onClick={handleForgotPassword} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={handleSignup} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
