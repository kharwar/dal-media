import React, { useContext, useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { formValidator, formValidationMsgs } from "../../utils";
import { Avatar, ButtonBase, Link, Paper } from "@mui/material";
import Images from "../../assets";
import { grey } from "@mui/material/colors";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { AuthContext } from "../../context";
import Axios from "axios";
import { sendEmail, verifyCode } from "../../helper";

const Signup = () => {
  const { isLogin, setLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(
    state?.user?.image ?? Images.avatarPlaceholder
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  const isEditMode = useMemo(() => {
    return state?.user ? true : false;
  }, [state]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);

    let errors = {};
    const data = {};

    formdata.forEach((formValue, key) => {
      console.log({ formValue, key });
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

    if (!isError) {
      setErrors(errors);
    } else {
      console.log({ data });
      if (isEditMode) {
        navigate("/profile");
      } else {
        const code = Math.floor(100000 + Math.random() * 900000);
        sendEmail(email, code).then(() => {
          if(verifyCode(code)){
            Axios.post("http://localhost:8000/api/users/signup", {
              firstName: firstName,
              lastName: lastName,
              email: email,
              bio: bio,
              password: password,
            }).then((res) => {
              if(res.data.success === true){
                setLogin(true);
                navigate("/", { replace: true });
              }else {
                alert("unsuccesful!");
              }
            });
          }else {
            alert("unsuccesful attempt");
          }
        });
        // setLogin(true);
        // navigate("/", { replace: true });
      }
    }
  };

  // const randomString = () => {
  //   let str = ''
  //   for(let i=0; i<8; i++){
  //     const char = Math.floor((Math.random() * 10) +1 )
  //     str += char
  //   }
  //   return str
  // }
  const login = () => {
    navigate("/login");
  };

  const onImageSelect = (e) => {
    if (e.target.files) {
      const fileList = e.target.files;
      const file = fileList[0];
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

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
                src={image}
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
                  defaultValue={state?.user.name ?? ""}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  defaultValue={state?.user.name ?? ""}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  defaultValue={state?.user.email ?? ""}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
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
                  defaultValue={state?.user.bio ?? ""}
                  onChange={(e) => setBio(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
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
            >
              {isEditMode ? "Save" : "Sign up"}
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
