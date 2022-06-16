import { TextField, Container, Button, Box,  Grid, Link, Paper, Form } from "@material-ui/core"
import React, { useEffect, useState } from 'react';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidFirstName, setIsValidFirstName] = useState(false);
    const [isValidLastName, setIsValidLastName] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const checkValidFirstName = (e) => {
        console.log(e.target.value);
          const name = e.target.value
          if(name.match(/^[a-zA-Z]+$/)){
              setIsValidFirstName(false);
          } else {
            setIsValidFirstName(true);
          }
      }

    const checkValidLastName = (e) => {
    console.log(e.target.value);
        const name = e.target.value
        if(name.match(/^[a-zA-Z]+$/)){
            setIsValidLastName(false);
        } else {
        setIsValidLastName(true);
        }
    }

    const checkValidEmail = (e) => {
        console.log(e.target.value);
          const email = e.target.value
          if(email.match(/^\w+@dal.ca/)){
              setIsValidEmail(false);
          } else {
              setIsValidEmail(true);
          }
      }

    const checkValidPassword = (e) => {
        console.log(e.target.value);
        const password = e.target.value
        setPassword(password);
        if(password.match(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&? "])[a-zA-Z0-9!#$@^%&?]{8,20}$/)){
            setIsValidPassword(false);
        } else {
            setIsValidPassword(true);
        }
    }

    const checkValidConfirmPassword = (e) => {
        const confirmpassword = e.target.value;
        setConfirmPassword(confirmPassword);
        if(confirmpassword === password) {
            setIsValidConfirmPassword(false);
        }
        else {
            setIsValidConfirmPassword(true);
        }
    }

    const handleSubmit = (e) => {
        console.log(e);
        console.log(isValidConfirmPassword)
        e.preventDefault();
        if (!isValidEmail && !isValidConfirmPassword && !isValidFirstName && !isValidLastName && !isValidPassword) {
          navigate("/profile")
        }
        else
        {
          setSubmitError(true);
        }

    }

    return (
        
        <Container  maxWidth="xs">

        <h2 align="center"> CONNECT AROUND DAL </h2>

      <Paper elevation={11} style={{margin:'20px auto',padding:'20px 20px'}}>

            <Box component='form' onSubmit={handleSubmit}>
                <h2 align="center"> Sign-Up </h2>
                <TextField margin="normal"
                    required
                    fullWidth
                    label="First Name"
                    name="firstname"
                    onChange = {checkValidFirstName}
                    placeholder='First Name'
                    variant='outlined' color='secondary' />
                    {isValidFirstName && <span className='err' style={{ color: 'red'}}>First Name should only contain alphabets</span>}
                <TextField margin="normal"
                    required
                    fullWidth
                    label="Last Name"
                    name="lastname"
                    placeholder='Last Name'
                    onChange = {checkValidLastName}
                    variant='outlined' color='secondary' />
                    {isValidLastName && <span className='err' style={{ color: 'red'}}>Last Name should only contain alphabets</span>}
                <TextField margin="normal"
                    required
                    fullWidth
                    type={"email"}
                    label="Email Address"
                    name="email"
                    onChange = {checkValidEmail}
                    placeholder='test@dal.ca'
                    variant='outlined' color='secondary' />
                    {isValidEmail && <span className='err' style={{ color: 'red'}}>Invalid email</span>}
                <TextField margin="normal"
                    required
                    fullWidth
                    name="dob"
                    label="Date of Birth"
                    type="date"
                    variant='outlined' 
                    color='secondary' 
                    InputLabelProps={{
                        shrink: true,
                      }}/>
                <TextField margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange = {checkValidPassword}
                    autoComplete="password" variant='outlined' color='secondary' />
                    {isValidPassword && <span className='err' style={{ color: 'red'}}>Password should have Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character</span>}
                <TextField margin="normal"
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="Confirm Password"
                    onChange = {checkValidConfirmPassword}
                    autoComplete="password" variant='outlined' color='secondary' />
                    {isValidConfirmPassword && <span className='err' style={{ color: 'red'}}>Password and Confirm Passwords don't match</span>}
            <br></br>
            {submitError && <span className='err' style={{ color: 'red'}}>Can't Submit. Fix Errors.</span>}
            <br></br>
            <Button variant='contained' type="submit" color='secondary'> Sign Up </Button>
            <br /> <br />
            </Box>
            <Grid>
                <Grid item >
                    Already have an account? <Link href="/login" align='center' color='secondary'>Sign In</Link>
                </Grid>
            </Grid>
            </Paper>
        </Container>
        
       
    )
}

export default Register;