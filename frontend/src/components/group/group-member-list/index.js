import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../alert-dialog";
import GroupMember from "../group-member";
import { snackbar } from "../../../components";
import { apiRoutes, ServiceManager } from "../../../services";

const fetchGroupMembers = async (groupId, setUsers) => {
  ServiceManager.getInstance()
    .request(`${apiRoutes.groups}/${groupId}/${apiRoutes.groupMembers}`)
    .then((res) => {
      setUsers(res.data);
    })
    .catch((error) => {
      console.log({ error });
    });
};

const GroupMemberList = (props) => {
  const [users, setUsers] = useState([]);
  const { setAlert, setOnAgree } = useAlert();
  const navigate = useNavigate();
  const userRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchGroupMembers(props.groupId, setUsers);
  }, []);

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
        key={user._id}
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
        <MenuItem onClick={handleRemove}>Remove</MenuItem>
      </Menu>
    </>
  );
};

export default GroupMemberList;
