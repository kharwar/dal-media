import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { snackbar } from "../../../components";
import { ServiceManager, apiRoutes } from "../../../services";
import { async } from "@firebase/util";
import { useAuth } from "../../../context";

const EventFooter = ({ event: { _id, interested, title } }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isClickedNow, setIsClickedNow] = useState(false);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    const usr = loggedInUser._id.toString(); //current loggedIn user id
    for (let a of interested) {
      if (a === usr) {
        setIsJoined(true);
        break;
      }
    }
  }, []);

  const clickHandler = async () => {
    const usrr = loggedInUser._id.toString(); //current loggedIn user id
    const params = {
      interested: [...interested, usrr],
    };

    try {
      const res = await ServiceManager.getInstance().request(
        apiRoutes.editEvent + "/" + _id.toString(),
        params,
        "put"
      );
      setIsClickedNow(true);
      setIsJoined(true);
      snackbar.current.showSnackbar(true, "You joined the event: " + title);
    } catch (error) {}
  };

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: "space-between", mb: 1 }}>
        <Stack direction="row" spacing={1}>
          <ThumbUpIcon />
          <Typography variant="body1">
            {isClickedNow ? interested.length + 1 : interested.length}
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ mb: 1 }} />
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button
          variant="outlined"
          disabled={isJoined}
          fullWidth
          onClick={clickHandler}
        >
          <ThumbUpOutlinedIcon sx={{ mr: 1 }} />
          <Typography variant="body1">Interested</Typography>
        </Button>
        <Divider />
      </Stack>
    </Box>
  );
};

export default EventFooter;
