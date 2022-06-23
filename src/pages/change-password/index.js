import React, { useState } from "react";
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

const ChangePassword = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
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
    } else {
      console.log({ data });
      navigate("/profile");
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
