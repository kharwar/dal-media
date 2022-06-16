import { Paper } from "@mui/material";
import React, { memo } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import _ from "lodash";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const File = ({ file, handleMenu }) => {
  console.log("File");

  return (
    <Paper sx={{ p: 1.5, my: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box sx={{ display: "flex", flex: 1, mr: 1 }}>
          <Typography variant="body1" sx={{ lineHeight: 1.4 }}>
            {file.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flex: 1, mr: 1 }}>
          <Typography
            variant="body2"
            sx={{ lineHeight: 1.4, color: grey[600] }}
          >
            {file.uploadedAt}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flex: 1, mr: 1 }}>
          <Typography
            variant="body2"
            sx={{ lineHeight: 1.4, color: grey[600] }}
          >
            {file.uploadedBy}
          </Typography>
        </Box>
        <IconButton onClick={handleMenu}>
          <MoreHorizIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return _.isEqual(prevProps.post, nextProps.post);
};

export default memo(File, propsAreEqual);
