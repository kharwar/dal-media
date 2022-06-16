import React from 'react'
import { TextField, Container, Button, Box, Grid, Link, Paper } from "@material-ui/core"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import swal from "sweetalert";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitError, setSubmitError] = useState(false);

    const checkValidPassword = (e) => {
        console.log(e.target.value);
        const password = e.target.value
        setPassword(password);
        if (password.match(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&? "])[a-zA-Z0-9!#$@^%&?]{8,20}$/)) {
            setIsValidPassword(false);
        } else {
            setIsValidPassword(true);
        }
    }

    const checkValidConfirmPassword = (e) => {
        const confirmpassword = e.target.value;
        setConfirmPassword(confirmPassword);
        if (confirmpassword === password) {
            setIsValidConfirmPassword(false);
        }
        else {
            setIsValidConfirmPassword(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValidConfirmPassword && !isValidPassword) {
            swal("Password updated successfully");
            navigate("/login")
        }
        else {
            setSubmitError(true);
        }

    }

    return (

        <Container maxWidth="xs">

            <h2 color='secondary'> Reset Password </h2>
            <Box component='form' onSubmit={handleSubmit}>
                <TextField margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="New Password"
                    type="password"
                    id="newpassword"
                    onChange={checkValidPassword}
                    autoComplete="password" variant='outlined' color='secondary' />
                {isValidPassword && <span className='err' style={{ color: 'red'}}>Password should have Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character</span>}
                <TextField margin="normal"
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="Confirm Password"
                    onChange={checkValidConfirmPassword}
                    autoComplete="password" variant='outlined' color='secondary' />
                     {isValidConfirmPassword && <span className='err' style={{ color: 'red'}}>Password and confirm passwords don't match</span>}
                <br />
                {submitError && <span className='err' style={{ color: 'red'}}>Can't Submit. Fix Errors.</span>}
                <Button variant='contained' type='submit' color='secondary'> Reset </Button>
            </Box>
        </Container>

    )
}

export default ResetPassword