import React from 'react'
// import {Paper,  Box, styled} from "@material-ui/core";
import {Paper,Typography, Stack, TableRow, Button, TableBody, Box} from "@mui/material";
import ProfileUi from 'react-profile-card';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  let navigate = useNavigate();
  const changeRoute = () => {
    navigate('/edit-profile');
  }
    return (
        
        <Paper elevation={11} style={{ margin: '100px auto', width: 700, height: 450, padding: '60px 60px' }}>
          <Box component='form'>
        {/* <div style={{align:'left'}}>  */}
        <Stack direction='row' spacing={5}>
        <ProfileUi 
            imgUrl='https://miro.medium.com/max/2048/0*0fClPmIScV5pTLoE.jpg' 
            name='Kavya Kasaraneni' 
            designation='Student' 
            />
            <div>
           <h2 >User Details</h2>
           <Typography variant='body'>

            <TableBody >
              <TableRow>
                <Label>First Name</Label>
                <LabelValue >Kavya</LabelValue>
              </TableRow>
              <TableRow >
                <Label>Last Name</Label>
                <LabelValue >Kasaraneni</LabelValue>
              </TableRow>
              <TableRow >
                <Label>Email</Label>
                <LabelValue >kv919136@dal.ca</LabelValue>
              </TableRow>
              <TableRow >
                <Label>Password</Label>
                <LabelValue type='password'>*****</LabelValue>
              </TableRow>
              <TableRow >
                <Label>DOB</Label>
                <LabelValue >29-01-1998</LabelValue>
              </TableRow>
            </TableBody>
              
           </Typography>
           <br /> <br />
           <Button variant='outlined' type="submit" color='secondary' onClick={changeRoute}>Edit Profile </Button>
           </div>
            </Stack>
        {/* </div> */}

        </Box>
        </Paper>
      
    )
}

export default Profile;


export const LabelValue = styled.td`
  font-weight: 450;
  font-size: 18px;
  margin-left: 50px; 
  width: 70%;
  text-align: left;
  padding: 10px;;
`;

export const Label = styled.td`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  padding: 10px;
  width: 70%;
`;


