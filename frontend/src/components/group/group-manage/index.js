import { Box, Button } from "@mui/material";
import { useAlert } from "../../alert-dialog";
import GroupMemberList from "../group-member-list";
import GroupAddMember from "../group-add-member";
import { snackbar } from "../../../components";

const GroupManage = () => {
  const { setAlert, setOnAgree } = useAlert();

  const onDelete = () => {
    snackbar.current.showSnackbar(true, "Group Deleted");
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
