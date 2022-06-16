import React from 'react'
import { TextField, Container, Button, Box, Grid, Link, Paper } from "@material-ui/core"
import { useState } from 'react';
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmissionRequest = (e) => {
    setIsLoginFailed(false);
    e.preventDefault();
    console.log(e.target);
    if (email === "kavya@dal.ca" && password === "pass") {
      console.log("Login success!");
      swal("Logged in successfully");
      setIsLoginFailed(false);
      if(!isLoginFailed) {
          navigate("/");
      }

    }else if (email === "" && password === "") {
      console.log("Login failure")
      setIsLoginFailed(true);
      e.stopPropagation();
    }
    else {
      console.log("Login failure")
      setIsLoginFailed(true);
      swal("Invalid Credentials");
      e.stopPropagation();
      e.target.email.value = "";
      e.target.password.value = "";
    }
  };

  const checkValid = (e) => {
    console.log(e.target.value);
    const email = e.target.value
    setEmail(email);
    if (email.match(/^\w+@dal.ca/)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  }

  const setPasswordValue = (e) => {
    setPassword(e.target.value);
  }


  return (

    <Container maxWidth="xs">
      <h2 align="center"> CONNECT AROUND DAL </h2>
      <Paper elevation={11} style={{ margin: '20px auto', padding: '20px 20px' }}>
        <Box component='form' onSubmit={handleSubmissionRequest}>
          <h2 align= "center"> SIGN-IN </h2>
          <TextField margin="normal"
            required
            fullWidth
            type="email"
            label="Email Address"
            name="email"
            placeholder='test@dal.ca'
            onChange={checkValid}
            variant='outlined' color='secondary' />
          {isValidEmail && <span className='err' style={{ color: 'red'}}>Invalid email</span>}

          <TextField margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={setPasswordValue}
            autoComplete="password" variant='outlined' color='secondary' />

          <Grid container item>
            <Link onClick = {() => navigate('/forgot-password')} style={{cursor: 'pointer'}}>Forgot password?</Link>
          </Grid>
          <Grid>
            <Button style={{marginTop:'5px', marginBottom:'5px'}} variant='contained' color='secondary' type='submit'> Login </Button>
          </Grid>
        </Box>
        <Grid>
          <Grid item >
            Don't have an account? <Link onClick = {() => navigate('/register')} style={{cursor: 'pointer'}} align='center' color='secondary'>Sign Up</Link>
          </Grid>
        </Grid>

      </Paper>
    </Container>

  )
}

export default Login;