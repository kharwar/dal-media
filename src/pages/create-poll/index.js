import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Paper,
  Typography,
  Stack,
  Button,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import "./styles.css";
import { loggedInUser } from "../../data";
import { dateFormat } from "../../utils";
import { useSnackbar } from "../../context";

const CreatePoll = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const { showSnackbar } = useSnackbar();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleOptionAChange = (event) => {
    setOptionA(event.target.value);
  };

  const handleOptionBChange = (event) => {
    setOptionB(event.target.value);
  };

  const onPost = () => {
    setLoading(true);
    //write you store logic here, api call and all
    // console.log(title + " " + textInput.current + " " + startDTvalue.toString() + " " + location);
    setTimeout(() => {
      setLoading(false);
      setTitle("");
      setQuestion("");
      setOptionA("");
      setOptionB("");
      showSnackbar(true, "Poll Created");
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
        label="Poll Title"
        variant="standard"
        required
        margin="normal"
        value={title}
        InputProps={{ style: { fontSize: 30 } }}
        InputLabelProps={{ style: { fontSize: 20 } }}
        onChange={handleTitleChange}
      />

      {/* Date time */}

      <Stack spacing="auto" direction="column" className="date-list">
        <TextField
          id="Location"
          label="Question"
          variant="standard"
          margin="normal"
          onChange={handleQuestionChange}
          value={question}
          InputProps={{ style: { fontSize: 20 } }}
          InputLabelProps={{ style: { fontSize: 20 } }}
        />
        <br />
        <TextField
          id="optionA"
          label="Enter your Option:A"
          variant="outlined"
          value={optionA}
          onChange={handleOptionAChange}
        />
        <br />
        <TextField
          id="optionB"
          label="Enter your Option:B"
          variant="outlined"
          value={optionB}
          onChange={handleOptionBChange}
        />
        <br />
      </Stack>

      <Stack direction="row" sx={styling.btnContainer}>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="contained"
            disabled={!title || loading}
            onClick={onPost}
            sx={{
              backgroundColor: "#455A64",
            }}
          >
            Create Poll
          </Button>
          {loading && <CircularProgress size={24} sx={styling.progress} />}
        </Box>
      </Stack>
    </Paper>
  );
};

export default CreatePoll;

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
