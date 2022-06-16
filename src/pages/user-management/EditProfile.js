import React from 'react'
import { Box, Stack} from "@mui/material";
import { Button, TextField, Paper } from '@material-ui/core';
import { Container } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState(false);
    const [isValidFirstName, setIsValidFirstName] = useState(false);
    const [isValidLastName, setIsValidLastName] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const checkValidFirstName = (e) => {
        console.log(e.target.value);
        const name = e.target.value
        setFirstName(name);
        if (name.match(/^[a-zA-Z]+$/)) {
            setIsValidFirstName(false);
            setSubmitError(false);
        } else {
            setIsValidFirstName(true);
        }
    }

    const checkValidLastName = (e) => {
        console.log(e.target.value);
        const name = e.target.value
        setLastName(name);
        if (name.match(/^[a-zA-Z]+$/)) {
            setIsValidLastName(false);
        } else {
            setIsValidLastName(true);
        }
    }

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

    const handleSave = (e) => {
        e.preventDefault();
        if(firstName === '' && lastName === '' && password === ''){
            setSubmitError(true);
        }
        else if (!isValidFirstName && !isValidLastName && !isValidPassword) {
            navigate("/profile")
        }
        else {
            setSubmitError(true);
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        navigate("/profile");
    }
    return (
        <Container maxWidth="xs" style={{ margin: '20px auto', padding: '20px 20px' }}>
            
            <Box component='form'>
                <h2 align="center"> Edit Profile </h2>
                <TextField margin="normal"
                    required
                    fullWidth
                    Label='First Name'
                    placeholder='FirstName'
                    // value={'kavya'}
                    name="firstname"
                    onChange={checkValidFirstName}
                    defaultValue="Kavya"
                    variant='outlined' color='secondary' />
                {isValidFirstName && <span className='err' style={{ color: 'red' }}>First Name should only contain alphabets</span>}
                <TextField margin="normal"
                    required
                    fullWidth
                    name="lastname"
                    placeholder='Last Name'
                    onChange={checkValidLastName}
                    defaultValue="Kasaraneni"
                    variant='outlined' color='secondary' />
                {isValidLastName && <span className='err' style={{ color: 'red' }}>Last Name should only contain alphabets</span>}
                <TextField margin="normal"
                    disabled
                    fullWidth
                    type={"email"}
                    name="email"
                    value="kavya@dal.ca"
                    variant='outlined' color='secondary' />
                <TextField margin="normal"
                    required
                    fullWidth
                    name="dob"
                    label="Date of Birth"
                    type="date"
                    variant='outlined'
                    color='secondary'
                    defaultValue="1998-01-29"
                    InputLabelProps={{
                        shrink: true,
                    }} />
                <TextField margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Current Password"
                    type="password"
                    id="password"
                    defaultValue="*****"
                    onChange={checkValidPassword}
                    autoComplete="password" variant='outlined' color='secondary' />
                {isValidPassword && <span className='err' style={{ color: 'red' }}>Password should have Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character</span>}
                {submitError && <span className='err' style={{ color: 'red' }}>Please fill all the details</span>}
                <br /><br />
                <Stack direction='row' spacing={28}>
                    <Button variant='contained' type="submit" color='secondary' onClick={handleSave}> Save </Button>
                    <Button variant='contained' type="submit" color='secondary' onClick={handleCancel}> Cancel </Button>
                </Stack>
            </Box>
            
        </Container>
    )
}

export default EditProfile;