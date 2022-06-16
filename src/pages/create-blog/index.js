import React, { useEffect, useRef, useState } from 'react';
import {
  Paper, Typography,
  Stack, IconButton, Button, Box,
  CircularProgress, Snackbar, Alert, TextField
} from '@mui/material';
import { ImageRounded, DeleteRounded } from '@mui/icons-material';
import './style.css';
import { RichTextInput } from '../../components';
import { useLocation, useParams } from 'react-router-dom';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const CreateBlog = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [body, setBody] = useState(initialValue);
  const [title, setTitle] = useState('');
  const [textFilled, setTextFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [image, setImage] = useState(null);
  const fileInput = useRef(null);

  const isPublishDisable = !textFilled || loading || image == null;


  useEffect(() => {
    if (state?.blog) {
      const { blog } = state;
      blog.title != '' && setTitle(blog.title);
      setImage(blog.image);
      setBody(blog.body);
    }
  }, [state, id]);

  const onPublish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTextFilled(false);
      setTitle('');
      setBody(initialValue);
      setSnackOpen(true);
    }, 5000);
  };

  const closeSnackbar = () => setSnackOpen(false);

  const onImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const onImageChange = (e) => {
    if (fileInput.current != null) {
      fileInput.current.click();
    }
  };

  const onDeleteImage = () => {
    setImage(null);
  };

  useEffect(() => {
    if (body[0]?.children[0]?.text != '' && title != '') {
      setTextFilled(true);
    } else {
      setTextFilled(false);
    }
  }, [body, title]);


  return (
    <Paper sx={{ m: '50px', p: '30px' }}>
      <Stack spacing={1.5} className="blog-title-container">
        <Typography variant='body1' style={{ paddingLeft: '10px' }}>Title</Typography>
        <TextField fullWidth id='title' required placeholder='My awesome blog!' size='medium' onChange={(e) => setTitle(e.target.value)} />
      </Stack>
      <Stack style={{ marginTop: '10px' }}>
        <RichTextInput value={body} setValue={setBody} style={{ height: 'fit-content', marginTop: '16px' }} />
      </Stack>
      {image != null &&
        <Box className="img-box">
          <div className="img-container">
            <img src={image} className="img" width="200" heigh="200" />
            <IconButton
              disabled={loading}
              sx={styling.btnDelete}
              onClick={() => onDeleteImage(image)}
            >
              <DeleteRounded />
            </IconButton>
          </div>
        </Box>}
      <Stack direction='row' className="btn-container">
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={onImageSelect}
        />
        <IconButton
          onClick={onImageChange}
          disabled={image != null || loading}
        >
          <ImageRounded />
        </IconButton>
        <Box className='publish-btn-container'>
          <Button variant='contained' sx={{
            backgroundColor: '#455A64'
          }}
            onClick={onPublish}
            disabled={isPublishDisable}
          >Publish</Button>
          {loading &&
            <CircularProgress
              size={24}
              className="progress"
            />}
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
          Blog published successfully!
        </Alert>
      </Snackbar>
    </Paper >
  );
};

export default CreateBlog;

const styling = {
  btnDelete: {
    position: 'absolute',
    top: '2%',
    right: '2%',
    backgroundColor: 'lightgrey'
  },
};