import { useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../alert-dialog";
import GroupMemberList from "../group-member-list";
import GroupAddMember from "../group-add-member";
import { useSnackbar } from "../../../context";

const GroupManage = () => {
  console.log("memberList");

  const { setAlert, setOnAgree } = useAlert();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const onDelete = () => {
    showSnackbar(true, "Group Deleted");
    console.log("delete");
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
          <GroupAddMember />
        </Box>
      </Box>
      <GroupMemberList />
    </>
  );
};

export default GroupManage;
