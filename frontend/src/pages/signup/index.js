/*
  Created on June 4th 2022
  Author: Kavya Kasaraneni
*/

import React, { useContext, useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { formValidator, formValidationMsgs, uploadFile } from "../../utils";
import {
  Avatar,
  ButtonBase,
  CircularProgress,
  Link,
  Paper,
} from "@mui/material";
import Images from "../../assets";
import { grey } from "@mui/material/colors";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { AuthContext, useAuth } from "../../context";
import { apiRoutes, ServiceManager } from "../../services";
import { snackbar } from "../../components";
import { storeLoggedInUser } from "../../local-storage";

//Front end code for implementing user registration into the application and also profile edit of user
const Signup = () => {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({
    file: null,
    url: loggedInUser?.image ?? Images.avatarPlaceholder,
  });
  const [imageChanged, setImageChanged] = useState(false);

  const isEditMode = useMemo(() => {
    return loggedInUser ? true : false;
  }, [loggedInUser]);

  //Backend API call for implementing the edit-profile and user registration features
  const submit = async (params, url, method, successMsg) => {
    if (imageChanged) {
      try {
        params["image"] = await uploadFile(image.file);
      } catch (error) {
        setLoading(false);
      }
    } else {
      params["image"] = image.url;
    }

    try {
      const res = await ServiceManager.getInstance().request(
        url,
        params,
        method
      );
      if (res.data.token) {
        ServiceManager.getInstance().userToken = res.data.token;
        storeLoggedInUser(res.data.token);
      }

      setLoggedInUser(res.data);
      setLoading(false);
      if (isEditMode) {
        navigate("/profile");
        snackbar.current.showSnackback(successMsg);
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      // snackbar.current.showSnackbar()
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);

    let errors = {};
    const data = {};

    formdata.forEach((formValue, key) => {
      const value = formValue.toString().trim();
      let isValid = false;

      data[key] = value;

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

    //Checking whether it is in edit-mode or sign up mode and implement backend api
    if (!isError) {
      setErrors(errors);
    } else {
      setLoading(true);
      const params = {
        firstname: data.firstName,
        lastname: data.lastName,
        bio: data.bio,
      };
      if (isEditMode) {
        params["id"] = loggedInUser._id;
        submit(
          params,
          apiRoutes.editProfile,
          "put",
          "Profile updated successfully"
        );
      } else {
        params["email"] = data.email;
        params["password"] = data.password;
        submit(params, apiRoutes.signUp, "post");
      }
    }
  };

  const login = () => {
    navigate("/login");
  };

  const onImageSelect = (e) => {
    if (e.target.files) {
      const fileList = e.target.files;
      const file = fileList[0];
      const url = URL.createObjectURL(file);
      setImage({ url, file });
      setImageChanged(true);
    }
  };

  //UI for Sign-up
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 8, my: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isEditMode ? <ManageAccountsIcon /> : <LockRoundedIcon />}
          <Typography component="h1" variant="h5">
            {isEditMode ? "Edit Profile" : "Sign up"}
          </Typography>
          <input
            id="select-avatar"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={onImageSelect}
          />
          <label htmlFor="select-avatar">
            <ButtonBase sx={{ borderRadius: 40, my: 2 }} component="span">
              <Avatar
                src={image.url}
                sx={{
                  width: 100,
                  height: 100,
                  borderStyle: "solid",
                  borderWidth: 3,
                  borderColor: grey[600],
                }}
              />
            </ButtonBase>
          </label>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  defaultValue={loggedInUser?.firstname ?? ""}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  defaultValue={loggedInUser?.lastname ?? ""}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={isEditMode}
                  required
                  fullWidth
                  id="email"
                  defaultValue={loggedInUser?.email ?? ""}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  fullWidth
                  maxRows={3}
                  id="bio"
                  defaultValue={loggedInUser?.bio ?? ""}
                  label="Bio"
                  name="bio"
                />
              </Grid>
              {!isEditMode && (
                <>
                  <Grid item xs={12}>
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
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : isEditMode ? (
                "Save"
              ) : (
                "Sign up"
              )}
            </Button>
          </Box>
          {!isEditMode && (
            <Grid container sx={{ justifyContent: "flex-end" }}>
              <Grid item>
                <Link onClick={login} variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
