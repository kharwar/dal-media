import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Paper,
  Typography,
  Stack,
  IconButton,
  Button,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import { DeleteRounded, ImageRounded } from "@mui/icons-material";
import "./styles.css";
import { PostTextInput } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { loggedInUser } from "../../data";
import { dateFormat } from "../../utils";
import { snackbar } from "../../components";

const CreateEvent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const textInput = useRef("");
  const [textFilled, setTextFilled] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDTvalue, setStartDTValue] = useState(new Date());
  const [endDTvalue, setEndDTValue] = useState(new Date());
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");

  const handleStartDTChange = (newValue) => {
    setStartDTValue(newValue);
  };

  const handleEndDTChange = (newValue) => {
    setEndDTValue(newValue);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    if (state?.event) {
      const { event } = state;
      event.description && textInput.current.setValue(event.description);
      setImages(event.images);
      setLocation(event.location);
      setTitle(event.title);
    }
  }, []);

  const onImageChange = (e) => {
    if (fileInput.current != null) {
      fileInput.current.click();
    }
  };

  const onImageSelect = (e) => {
    if (e.target.files) {
      const fileList = e.target.files;
      const newImages = [];
      let lastId = images.length;

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const url = URL.createObjectURL(file);
        const id = lastId + 1;
        newImages.push(url);
        lastId = id;
      }

      setImages((oldImages) => [...oldImages, ...newImages]);
    }
  };

  const onDeleteImage = (url) => {
    const filteredImages = images.filter((image) => image != url);
    setImages(filteredImages);
  };

  const onTextChange = (text) => {
    if (text !== "" && !textFilled) {
      setTextFilled(true);
    } else if (text === "" && textFilled) {
      setTextFilled(false);
    }
  };

  const onPost = () => {
    setLoading(true);
    //write you store logic here, api call and all
    // console.log(title + " " + textInput.current + " " + startDTvalue.toString() + " " + location);
    setTimeout(() => {
      setLoading(false);
      textInput.current?.setValue("");
      setImages([]);
      setTextFilled(false);
      setTitle("");
      setLocation("");
      const key = state?.event ? "updated" : "created";
      snackbar.current.showSnackbar(true, `Event ${key}`);
    }, 3000);
  };

  return (
    <Paper sx={{ m: "50px", p: "30px" }}>
      <Stack direction="row" spacing={1.5}>
        <Avatar
          alt={loggedInUser.name}
          src={loggedInUser.image}
          sx={{ width: 56, height: 56 }}
        />
        <Stack>
          <Typography variant="h5" component="h5">
            {loggedInUser.name}
          </Typography>
          <Typography variant="body1">
            {dateFormat(Date.now(), "MMM DD, YYYY")}
          </Typography>
        </Stack>
      </Stack>

      {/* added textfield for eventTitle */}
      <TextField
        id="standard-Title"
        label="Title"
        variant="standard"
        required
        margin="normal"
        value={title}
        InputProps={{ style: { fontSize: 30 } }}
        InputLabelProps={{ style: { fontSize: 20 } }}
        onChange={handleTitleChange}
      />

      <PostTextInput
        ref={textInput}
        onChange={onTextChange}
        disabled={loading}
        minRows={5}
        maxRows={20}
        autoFocus={true}
        placeholder={"Event Description"}
        sx={{ mt: "30px", fontSize: 20 }}
      />

      {/* Date time */}

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing="auto" direction="row" className="date-list">
          <DateTimePicker
            label="Start Date&Time"
            value={startDTvalue}
            onChange={handleStartDTChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            label="End Date&Time"
            value={endDTvalue}
            onChange={handleEndDTChange}
            minDateTime={startDTvalue}
            renderInput={(params) => <TextField {...params} />}
          />

          <TextField
            id="Location"
            label="Location"
            variant="standard"
            margin="normal"
            value={location}
            onChange={handleLocationChange}
            InputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </Stack>
      </LocalizationProvider>

      {images.length > 0 && (
        <Box className="img-list">
          {images.map((image, index) => (
            <div className="img-container" key={index + ""}>
              <img className="img" src={image} width="350" height="350" />
              <IconButton
                disabled={loading}
                sx={styling.btnDelete}
                onClick={() => onDeleteImage(image)}
              >
                <DeleteRounded />
              </IconButton>
            </div>
          ))}
        </Box>
      )}

      <Stack direction="row" sx={styling.btnContainer}>
        <input
          type="file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={onImageSelect}
        />
        <IconButton onClick={onImageChange} disabled={loading}>
          <ImageRounded fontSize="medium" />
        </IconButton>

        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="contained"
            disabled={(images.length == 0 && !textFilled) || loading || !title}
            onClick={onPost}
            sx={{
              backgroundColor: "#455A64",
            }}
          >
            {state?.event ? "Save" : "Create Event"}
          </Button>
          {loading && <CircularProgress size={24} sx={styling.progress} />}
        </Box>
      </Stack>
    </Paper>
  );
};

export default CreateEvent;

const styling = {
  btnDelete: {
    position: "absolute",
    top: "2%",
    right: "2%",
    backgroundColor: "lightgrey",
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-12px",
    marginLeft: "-12px",
  },
  btnContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
};