import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MenuItem, Box, Typography } from "@mui/material";
import { groups } from "../../data";
import { useAlert } from "../alert-dialog";
import GroupItem from "../group-item";
import { useSnackbar } from "../../context";
const GroupList = () => {
  console.log("fileList");

  const { setAlert, setOnAgree } = useAlert();
  const { showSnackbar } = useSnackbar();
  const fileRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setOnAgree(onDelete);
  }, []);

  const handleMenu = (event, file) => {
    fileRef.current = file;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDelete = () => {
    showSnackbar(true, "You left the group");
  };

  const handleLeave = () => {
    handleClose();
    setAlert(true, "Leave Group", "Are you sure you want to leave this group?");
  };

  const renderGroupItem = useCallback((group) => {
    return (
      <GroupItem
        group={group}
        key={group.id}
        handleMenu={(event) => handleMenu(event, group)}
      />
    );
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", flex: 1, mr: 1, mt: 2 }}>
        <Typography variant="h5" sx={{ lineHeight: 1.4 }}>
          Groups
        </Typography>
      </Box>
      {groups.map(renderGroupItem)}
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLeave}>Leave Group</MenuItem>
      </Menu>
    </>
  );
};

export default GroupList;
