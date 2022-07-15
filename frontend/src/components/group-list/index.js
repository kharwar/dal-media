import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MenuItem, Box, Typography } from "@mui/material";
import { useAlert } from "../alert-dialog";
import GroupItem from "../group-item";
import { snackbar } from "../../components";
import { apiRoutes, ServiceManager } from "../../services";

const fetchGroups = async (setGroups) => {
  ServiceManager.getInstance()
    .request(apiRoutes.groups)
    .then((res) => {
      setGroups(res.data);
    })
    .catch((error) => {
      console.log({ error });
    });
};

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  console.log("fileList");

  const { setAlert, setOnAgree } = useAlert();
  const fileRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setOnAgree(onDelete);
    fetchGroups(setGroups);
  }, []);

  const handleMenu = (event, file) => {
    fileRef.current = file;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDelete = () => {
    snackbar.current.showSnackbar(true, "You left the group");
  };

  const handleLeave = () => {
    handleClose();
    setAlert(true, "Leave Group", "Are you sure you want to leave this group?");
  };

  const renderGroupItem = useCallback((group) => {
    return (
      <GroupItem
        group={group}
        key={group._id}
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
