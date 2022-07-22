import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useAlert } from "../../alert-dialog";
import GroupMemberList from "../group-member-list";
import GroupAddMember from "../group-add-member";
import { snackbar } from "../../../components";
import { apiRoutes, ServiceManager } from "../../../services";
import { useNavigate } from "react-router-dom";

const deleteGroup = (groupId, navigate) => {
  ServiceManager.getInstance()
    .request(`${apiRoutes.groups}/${groupId}`, null, "delete")
    .then((res) => {
      snackbar.current.showSnackbar(true, "Group Deleted");
      navigate("/groups");
    })
    .catch((error) => {});
};

const GroupManage = (props) => {
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const { setAlert, setOnAgree } = useAlert();
  const navigate = useNavigate();

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
      <Box sx={{ mb: 1 }}>
        <GroupMemberList groupId={props.groupId} createdBy={props.createdBy} />
        <Box sx={{ display: "flex", mr: 1, justifyContent: "flex-end" }}>
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
      </Box>
    </>
  );
};

export default GroupManage;
