import React, { useRef, useState, useEffect } from 'react';
import {
  Avatar, Paper, Typography,
  Stack, IconButton, Button, Box,
  CircularProgress, Snackbar, Alert, TextField, Checkbox, FormGroup, FormControlLabel
} from '@mui/material';
import Images from '../../assets';
import { DeleteRounded, ImageRounded } from '@mui/icons-material';
import './styles.css';
import { PostTextInput } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { loggedInUser } from '../../data';
import { dateFormat } from '../../utils';



const DisplayPoll = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const textInput = useRef('');
  const [textFilled, setTextFilled] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');



  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };












  const onPost = () => {

    setLoading(true);
    //write you store logic here, api call and all
    // console.log(title + " " + textInput.current + " " + startDTvalue.toString() + " " + location);
    setTimeout(() => {
      setLoading(false);
      setImages([]);
      setTextFilled(false);
      setSnackOpen(true);
      setTitle('');
      setLocation('');
    }, 5000);

  };

  const closeSnackbar = () => setSnackOpen(false);

  return (
    <Paper sx={{ m: '50px', p: '30px' }}>
      <Stack direction="row" spacing={1.5}>

        <Stack>
          <Typography variant="h3" component="h3" >
            Welcome Poll
          </Typography>
        </Stack>
      </Stack>




      {/* Date time */}


      <Stack spacing='auto' direction="column" className="date-list">


        <Typography variant="h5" component="h5" margin="normal" >
          How did you here about this group?
        </Typography>
        <Typography margin="normal" >
          (you can select multiple options)
        </Typography>

        <br />
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Through a Friend" />
          <FormControlLabel control={<Checkbox />} label="Through a website" />
          <FormControlLabel control={<Checkbox />} label="Through a different group" />
          <FormControlLabel control={<Checkbox />} label="Other" />
        </FormGroup>

      </Stack>









      <Stack
        direction="row"
        sx={styling.btnContainer}
      >




        <Box
          sx={{ m: 1, position: 'relative' }}
        >
          <Button
            variant="contained"
            disabled={false}
            onClick={onPost}
            sx={{
              backgroundColor: '#455A64'
            }}>
            Submit
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={styling.progress}
            />
          )}
        </Box>
      </Stack>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity="success"
          sx={{ width: '100%' }}
          variant="filled"
        >
          Submitted successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default DisplayPoll;

const styling = {
  btnDelete: {
    position: 'absolute',
    top: '2%',
    right: '2%',
    backgroundColor: 'lightgrey'
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-12px',
    marginLeft: '-12px',
  },
  btnContainer: {
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};