import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { snackbar } from "../../../components";

const EventFooter = ({ event: { interested } }) => {
  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: "space-between", mb: 1 }}>
        <Stack direction="row" spacing={1}>
          <ThumbUpIcon />
          <Typography variant="body1">{interested.length}</Typography>
        </Stack>
      </Stack>
      <Divider sx={{ mb: 1 }} />
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() =>
            snackbar.current.showSnackbar(true, "You joined this event")
          }
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
