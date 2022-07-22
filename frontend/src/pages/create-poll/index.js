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
import { snackbar } from "../../components";
import { useAuth } from "../../context";
import { apiRoutes, ServiceManager } from "../../services";
import { useParams, useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [optionList, setOptionList] = useState([""]);
  const { loggedInUser } = useAuth();
  const urlParams = useParams();
  const navigate = useNavigate();

  // handle option change
  const handleOptionChange = (e, index) => {
    const value = e.target.value;
    const list = [...optionList];
    list[index] = value;
    setOptionList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...optionList];
    list.splice(index, 1);
    setOptionList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setOptionList([...optionList, ""]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const onPost = async () => {
    setLoading(true);

    const params = {
      title: title,
      question: question,
      option: optionList,
      groupId: urlParams.id.toString(), //get group id
      createBy: loggedInUser._id.toString(),
    };

    try {
      const res = await ServiceManager.getInstance().request(
        apiRoutes.createPoll,
        params,
        "post"
      );
      snackbar.current.showSnackbar(true, "Poll Created");
      setLoading(false);
      setTitle("");
      setQuestion("");
      setOptionList([""]);
      navigate(-1);
    } catch (error) {
      snackbar.current.showSnackbar(true, "Poll Can not be created");
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ m: "50px", p: "30px" }}>
      <Stack direction="row" spacing={1.5}>
        <Avatar
          alt={loggedInUser.firstname}
          src={loggedInUser.image}
          sx={{ width: 56, height: 56 }}
        />
        <Stack>
          <Typography variant="h5" component="h5">
            {loggedInUser.firstname}
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

        {optionList.map((x, i) => {
          return (
            <div key={i}>
              <TextField
                id={i.toString()}
                label="Enter your Option:"
                variant="outlined"
                value={x}
                onChange={(e) => handleOptionChange(e, i)}
              />
              <div>
                {optionList.length !== 1 && (
                  <button className="mr10" onClick={() => handleRemoveClick(i)}>
                    Remove
                  </button>
                )}
                {optionList.length - 1 === i && (
                  <button onClick={handleAddClick}>Add</button>
                )}
              </div>
              <br />
            </div>
          );
        })}
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
