import React, { useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  Button,
  Box,
  CircularProgress,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import "./styles.css";
import { snackbar } from "../../components";

const DisplayPoll = () => {
  const [loading, setLoading] = useState(false);

  const onPost = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      snackbar.current.showSnackbar(true, "Poll Submitted");
    }, 3000);
  };

  return (
    <Paper sx={{ my: "30px", p: "30px" }}>
      <Stack direction="row" spacing={1.5}>
        <Stack>
          <Typography variant="h3" component="h3">
            Welcome Poll
          </Typography>
        </Stack>
      </Stack>

      {/* Date time */}

      <Stack spacing="auto" direction="column" className="date-list">
        <Typography variant="h5" component="h5" margin="normal">
          How did you here about this group?
        </Typography>
        <Typography margin="normal">
          (you can select multiple options)
        </Typography>

        <br />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Through a Friend"
          />
          <FormControlLabel control={<Checkbox />} label="Through a website" />
          <FormControlLabel
            control={<Checkbox />}
            label="Through a different group"
          />
          <FormControlLabel control={<Checkbox />} label="Other" />
        </FormGroup>
      </Stack>

      <Stack direction="row" sx={styling.btnContainer}>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="contained"
            disabled={loading}
            onClick={onPost}
            sx={{
              backgroundColor: "#455A64",
            }}
          >
            Submit
          </Button>
          {loading && <CircularProgress size={24} sx={styling.progress} />}
        </Box>
      </Stack>
    </Paper>
  );
};

export default DisplayPoll;

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
