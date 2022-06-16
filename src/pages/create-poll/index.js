import React, { useRef, useState, useEffect } from 'react';
import {
  Avatar, Paper, Typography,
  Stack, IconButton, Button, Box,
  CircularProgress, Snackbar, Alert, TextField
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



const CreatePoll = () => {

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
        <Avatar
          alt={loggedInUser.name}
          src={loggedInUser.image}
          sx={{ width: 56, height: 56 }}
        />
        <Stack>
          <Typography variant="h5" component="h5" >
            {loggedInUser.name}
          </Typography>
          <Typography variant="body1">
            {dateFormat(Date.now(), 'MMM DD, YYYY')}
          </Typography>
        </Stack>
      </Stack>

      {/* added textfield for eventTitle */}
      <TextField id="standard-Title" label="Poll Title" variant="standard" required
        margin="normal"
        value={title}
        InputProps={{ style: { fontSize: 30 } }}
        InputLabelProps={{ style: { fontSize: 20 } }}
        onChange={handleTitleChange}
      />


      {/* Date time */}


      <Stack spacing='auto' direction="column" className="date-list">

        <TextField id="Location" label="Question" variant="standard"
          margin="normal"
          InputProps={{ style: { fontSize: 20 } }}
          InputLabelProps={{ style: { fontSize: 20 } }}
        />
        <br />
        <TextField id="optionA" label="Enter your Option:A" variant="outlined" />
        <br />
        <TextField id="optionB" label="Enter your Option:B" variant="outlined" />
        <br />
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
            disabled={!title}
            onClick={onPost}
            sx={{
              backgroundColor: '#455A64'
            }}>
            Create Poll
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
          Poll created successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CreatePoll;

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