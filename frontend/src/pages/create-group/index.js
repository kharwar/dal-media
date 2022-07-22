import React, { useRef, useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import "./styles.css";
import { TextInput, snackbar } from "../../components";
import { useNavigate } from "react-router-dom";
import { apiRoutes, ServiceManager } from "../../services";

const CreateGroup = () => {
  const navigate = useNavigate();
  const nameInput = useRef(null);
  const descriptionInput = useRef(null);
  const [nameFilled, setNameFilled] = useState(false);
  const [descriptionFilled, setDescriptionFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onNameChanged = (text) => {
    if (text !== "" && !nameFilled) {
      setNameFilled(true);
    } else if (text === "" && nameFilled) {
      setNameFilled(false);
    }
  };

  const onDescriptionChanged = (text) => {
    if (text !== "" && !descriptionFilled) {
      setDescriptionFilled(true);
    } else if (text === "" && descriptionFilled) {
      setDescriptionFilled(false);
    }
  };

  const onCreateGroup = async () => {
    setLoading(true);

    const params = {
      name: nameInput.current.getValue(),
      description: descriptionInput.current.getValue(),
    };

    try {
      const res = await ServiceManager.getInstance().request(
        apiRoutes.groups,
        params,
        "post"
      );
      snackbar.current.showSnackbar(true, res.message);
      navigate("/groups");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ m: "50px", p: "30px" }}>
      <Typography variant="h6" component="h6" sx={{ lineHeight: 1.2 }}>
        {"Create Group"}
      </Typography>
      <TextInput
        ref={nameInput}
        onChange={onNameChanged}
        disabled={loading}
        minRows={8}
        maxRows={20}
        autoFocus={true}
        placeholder={"Name"}
        multiline={false}
        sx={{ mt: "30px", fontSize: 20 }}
      />
      <Divider />
      <TextInput
        ref={descriptionInput}
        onChange={onDescriptionChanged}
        disabled={loading}
        minRows={8}
        maxRows={20}
        autoFocus={true}
        placeholder={"Description"}
        multiline={true}
        sx={{ mt: "30px", fontSize: 20 }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="contained"
            disabled={!(nameFilled && descriptionFilled) || loading}
            onClick={onCreateGroup}
            sx={{
              backgroundColor: "#455A64",
            }}
          >
            Create
          </Button>
          {loading && <CircularProgress size={24} sx={styling.progress} />}
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateGroup;

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
