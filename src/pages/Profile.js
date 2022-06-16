import React from 'react'
// import {Paper,  Box, styled} from "@material-ui/core";
import {Paper,Typography, Stack, TableRow, Button, TableBody} from "@mui/material";
import ProfileUi from 'react-profile-card';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  let navigate = useNavigate();
  const changeRoute = () => {
    navigate('/editprofile');
  }
    return (
        
        <Paper elevation={11} style={{ margin: '100px auto', width: 600, height: 300, padding: '60px 60px' }}>
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

      
        </Paper>
      
    )
}

export default Profile


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

























































































































































// import { Container,Row,Col,Button, Figure } from 'react-bootstrap';
// import React from 'react';
// import styled from 'styled-components';


// const Profile = () => {
//   return (
//     <Container>
//       <Wrapper>
//     <Row style={{ display: "flex" }}>
//       <Col sm={8}>
//         <Figure style={{marginLeft: '0.5px'}}>
//           <Figure.Image 
            
//             src="https://www.google.com/search?q=kids+images&rlz=1C1GCEB_enCA1008CA1008&sxsrf=ALiCzsZm4c8ygL-6BAMvz0CJU4Sk5VOrcw:1655384065545&tbm=isch&source=iu&ictx=1&vet=1&fir=QLPNvd0VEC9BNM%252C5DCMc5ngauWaRM%252C_%253BzdrGUqykHXG7XM%252Cu3AzN5mDnLOMdM%252C_%253Blr_nFDagh97B1M%252Cu3AzN5mDnLOMdM%252C_%253B_f2RJFPYYFpeWM%252Ct8-1k7ljfWzHUM%252C_%253BEnlO54zfKzv6eM%252CEQUgCGAd31yPTM%252C_%253B59XY2SuKT_pafM%252C1-8Anqg8qIjWxM%252C_%253B_7yE5wcV5N-ZkM%252CgMz3B40yKYXSfM%252C_%253BmLNvG3mheTn2MM%252CQ7rUXPOwv_3aqM%252C_%253BjtG1H31tHCNbgM%252CgYSZtCKuC-swdM%252C_%253BX_MpPT5oJRdssM%252CkqOYFxekVxVLBM%252C_%253BUkCffr3hAglz1M%252COLhxDFx71zzD8M%252C_%253B8VLfMPvbOInsMM%252CgYSZtCKuC-swdM%252C_%253BrkdjqUKNx_5JnM%252CPBNwcrcOsMJKrM%252C_&usg=AI4_-kQyb7kgG4YHss6EnTIl_l02euR98A&sa=X&ved=2ahUKEwi39sWZgrL4AhWlATQIHbVUCSQQ9QF6BAgPEAE#imgrc=zdrGUqykHXG7XM"
//             style={{
//               width: "50%",
//               height: "50%",
//               alignContent:'left',
//               marginRight: '200px'       
//                }}
//           />
//         </Figure>
//       </Col>
//       <Col  style={{ textAlign: "left" }}>
//         <h1>
//            User Profile
//         </h1>
//         <br></br>
//         <p>
//           First Name : Kavya
//           <br></br>
//           <br></br>
//           Last Name : d
//           <br></br>
//           <br></br>
//           Email : 123
//           <br></br>
//           <br></br>
//           Address : 456
//           <br></br>
//           <br></br>
//         </p>
//         <Row>
//           <Col>
//             <Button >Edit Profile</Button>
//           </Col>
//           <Col>
//             <Button >Delete Profile</Button>
//           </Col>
//         </Row>
//       </Col>
//     </Row>
//     </Wrapper>
//   </Container>
//   )
// }

// export default Profile

// export const Wrapper = styled.div`
//   margin: 8% auto;
//   display: block;
//   width: 600px;
//   padding: 50px;
//   align: center;
//   height:300px;
//   border: 2px solid #aaa;
//   // box-shadow: 0 0 8px 0 rgba(100, 100, 100, 0.25);

//   @media screen and (max-width: 960px) {
//     width: 95%;
//     padding: 20px;
//     border: none;
//     box-shadow: none;
//   }
// `;