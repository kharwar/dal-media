import React from 'react'
import { TextField, Container, Button, Box, Grid, Link } from "@material-ui/core"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";

const ForgotPassword = () => {

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [err, setErr] = useState(false);
  let navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isValidEmail) {
      swal("An email has been sent with reset link to your email");
      navigate('/resetpassword');
      e.target.email.value = "";
    }
  }
  return (

    <Container maxWidth="xs">

      <h2 color='secondary'> Forgot Password </h2>

      <Box component='form' onSubmit={handleSubmit}>
        <TextField margin="normal"
          required
          fullWidth
          type={"email"}
          label="Email Address"
          name="email"
          placeholder='test@dal.ca'
          onChange={checkValid}
          variant='outlined' color='secondary' />
        {isValidEmail && <span className='err' style={{ color: 'red' }}>Provide a valid Email address</span>}
        <Grid item >
          Remember Already? <Link href="/login" align='center' color='secondary'>Sign In</Link>
        </Grid>
        <br />
        <Button variant='contained' type='submit' color='secondary'> Submit </Button>
      </Box>
    </Container>
  )
}

export default ForgotPassword