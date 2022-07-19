import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useAlert } from "../../alert-dialog";
import GroupMemberList from "../group-member-list";
import GroupAddMember from "../group-add-member";
import { snackbar } from "../../../components";
import { apiRoutes, ServiceManager } from "../../../services";
import { useNavigate } from "react-router-dom";

const fetchUsersToAdd = async (groupId, setUsers) => {
  ServiceManager.getInstance()
    .request(`${apiRoutes.groups}/${groupId}/${apiRoutes.usersToAdd}`)
    .then((res) => {
      setUsers(res.data);
    })
    .catch((error) => {
      console.log({ error });
    });
};

const fetchGroupMembers = async (groupId, setMembers) => {
  ServiceManager.getInstance()
    .request(`${apiRoutes.groups}/${groupId}/${apiRoutes.groupMembers}`)
    .then((res) => {
      setMembers(res.data);
    })
    .catch((error) => {
      console.log({ error });
    });
};

const deleteGroup = (groupId, navigate) => {
  ServiceManager.getInstance()
    .request(`${apiRoutes.groups}/${groupId}`, null, "delete")
    .then((res) => {
      console.log(res.data);
      snackbar.current.showSnackbar(true, "Group Deleted");
      navigate("/groups");
    })
    .catch((error) => {
      console.log({ error });
    });
};

const GroupManage = (props) => {
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const { setAlert, setOnAgree } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroupMembers(props.groupId, setMembers);
    fetchUsersToAdd(props.groupId, setUsers);
  }, []);

  const onDelete = () => {
    deleteGroup(props.groupId, navigate);
  };

  const deleteGroupHandler = () => {
    setOnAgree(onDelete);
    setAlert(
      true,
      "Delete Group",
      "Are you sure you want to delete this group?"
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", mr: 1 }}>
          <Button
            variant="contained"
            onClick={deleteGroupHandler}
            sx={{
              backgroundColor: "#e74c3c",
            }}
          >
            Delete Group
          </Button>
        </Box>
        <Box sx={{ display: "flex", mr: 1 }}>
          <GroupAddMember groupId={props.groupId} users={users} />
        </Box>
      </Box>
      <GroupMemberList groupId={props.groupId} members={members} />
    </>
  );
};

export default GroupManage;
