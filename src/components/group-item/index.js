import { Paper } from "@mui/material";
import React, { memo } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import _ from "lodash";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

const GroupItem = ({ group, handleMenu }) => {
  const navigate = useNavigate();
  console.log("Group");

  return (
    <Paper sx={{ p: 1.5, my: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Stack
          sx={{ display: "flex", flex: 1, mr: 1 }}
          onClick={() => navigate(`./${group.id}`)}
        >
          <Box sx={{ display: "flex", flex: 1, mr: 1 }}>
            <Typography variant="body1" sx={{ lineHeight: 1.4 }}>
              {group.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flex: 1, mr: 1 }}>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.4, color: grey[600] }}
            >
              {group.description}
            </Typography>
          </Box>
        </Stack>
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

export default memo(GroupItem, propsAreEqual);
