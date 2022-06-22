import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { users } from "../../../data";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../alert-dialog";
import GroupMember from "../group-member";
import { snackbar } from "../../../components";

const GroupMemberList = () => {
  console.log("memberList");

  const { setAlert, setOnAgree } = useAlert();
  const navigate = useNavigate();
  const userRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event, user) => {
    userRef.current = user;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdmin = () => {
    console.log("Admin");
    setOnAgree(handleMakeAdmin);
    handleClose();
    setAlert(
      true,
      "Make Admin",
      "Are you sure you want to make this user the admin of the group?"
    );
  };

  const handleMakeAdmin = () => {
    snackbar.current.showSnackbar(true, "This user is mow admin");
  };

  const handleRemove = () => {
    setOnAgree(handleRemoveUser);
    handleClose();
    setAlert(
      true,
      "Remove Member",
      "Are you sure you want to remove this user?"
    );
  };

  const handleRemoveUser = () => {
    snackbar.current.showSnackbar(true, "User removed from group");
  };

  const renderMember = useCallback((user) => {
    return (
      <GroupMember
        user={user}
        key={user.id}
        handleMenu={(event) => handleMenu(event, user)}
      />
    );
  }, []);

  return (
    <>
      {users.map(renderMember)}
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
        <MenuItem onClick={handleAdmin}>Make Admin</MenuItem>
        <MenuItem onClick={handleRemove}>Remove</MenuItem>
      </Menu>
    </>
  );
};

export default GroupMemberList;
