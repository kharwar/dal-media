import React, { useRef, useState } from 'react';
import {
  Avatar, Paper, Typography,
  Stack, IconButton, Button, Box,
  CircularProgress, Snackbar, Alert
} from '@mui/material'
import Images from '../../assets'
import { DeleteRounded, ImageRounded } from '@mui/icons-material';
import './styles.css';
import { PostTextInput } from '../../components';

const CreatePost = () => {

  const fileInput = useRef(null);
  const textInput = useRef(null);
  const [textFilled, setTextFilled] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const onImageChange = (e) => {

    if (fileInput.current != null) {
      fileInput.current.click();
    }
  }

  const onImageSelect = (e) => {
    if (e.target.files) {
      const fileList = e.target.files
      const newImages = [];
      let lastId = images.length;

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const url = URL.createObjectURL(file);
        const id = lastId + 1;
        newImages.push({ id, url });
        lastId = id;
      }

      setImages((oldImages) => [...oldImages, ...newImages]);
    }
  }

  const onDeleteImage = (id) => {
    const filteredImages = images.filter((image) => image.id != id);
    setImages(filteredImages);
  }

  const onTextChange = (text) => {
    if (text != '' && !textFilled) {
      setTextFilled(true);
    }
    else if (text === '' && textFilled) {
      setTextFilled(false);
    }
  }

  const onPost = () => {

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      textInput.current?.setValue('');
      setImages([]);
      setTextFilled(false);
      setSnackOpen(true)
    }, 5000);

  }

  const closeSnackbar = () => setSnackOpen(false);

  return (
    <Paper sx={{ m: '50px', p: '30px' }}>
      <Stack direction="row" spacing={1.5}>
        <Avatar
          alt="Jeff Hardy"
          src={Images.avatar}
          sx={{ width: 56, height: 56 }}
        />
        <Stack>
          <Typography variant="h5" component="h5" >
            Jeff Hardy
          </Typography>
          <Typography variant="body1">
            June 2, 2022
          </Typography>
        </Stack>
      </Stack>
      <PostTextInput
        ref={textInput}
        onChange={onTextChange}
        disabled={loading}
        minRows={8}
        maxRows={20}
        autoFocus={true}
        placeholder={"What's on your mind?"}
        sx={{ mt: '30px', fontSize: 20 }}
      />
      {images.length > 0 &&
        <Box className="img-list">
          {images.map((image, index) =>
            <div className="img-container" key={index + ''}>
              <img
                className="img"
                src={image.url}
                width="350"
                height="350"
              />
              <IconButton
                disabled={loading}
                sx={styling.btnDelete}
                onClick={() => onDeleteImage(image.id)}
              >
                <DeleteRounded />
              </IconButton>
            </div>
          )}
        </Box>
      }
      <Stack
        direction="row"
        sx={styling.btnContainer}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={onImageSelect}
        />
        <IconButton
          onClick={onImageChange}
          disabled={loading}
        >
          <ImageRounded fontSize="medium" />
        </IconButton>
        <Box
          sx={{ m: 1, position: 'relative' }}
        >
          <Button
            variant="contained"
            disabled={(images.length == 0 && !textFilled) || loading}
            onClick={onPost}
            sx={{
              backgroundColor: '#455A64'
            }}>
            Post
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
          Post created successfully
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default CreatePost

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
}