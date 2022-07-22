import { Avatar, Paper } from "@mui/material";
import React, { memo } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import _ from "lodash";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";

const GroupItem = ({ group, handleMenu }) => {
  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 1.5, my: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Stack
          sx={{ display: "flex", flex: 1, cursor: "pointer" }}
          direction="row"
          onClick={() =>
            navigate(`./${group._id}`, {
              state: { createdBy: group.createdBy },
            })
          }
        >
          <Avatar sx={{ bgcolor: "#2c3e50" }}>
            <GroupsIcon />
          </Avatar>
          <Stack
            sx={{ display: "flex", flex: 1, mr: 1, ml: 2, cursor: "pointer" }}
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
