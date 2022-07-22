import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { Stack, Box } from "@mui/material";
import _ from "lodash";
import { snackbar } from "../../../components";
import { apiRoutes, ServiceManager } from "../../../services";

const fetchUsersToAdd = async (groupId, setUsers) => {
  ServiceManager.getInstance()
    .request(`${apiRoutes.groups}/${groupId}/${apiRoutes.usersToAdd}`)
    .then((res) => {
      setUsers(res.data);
    })
    .catch((error) => {});
};

const addUserToGroup = async (groupId, userId, setUsers) => {
  const params = {
    userId: userId,
  };

  let user = null;

  try {
    const { data } = await ServiceManager.getInstance().request(
      `${apiRoutes.groups}/${groupId}/${apiRoutes.groupMembers}`,
      params,
      "put"
    );
    user = data;
  } catch (error) {}

  return user;
};

let selectedUserId = null;

const GroupAddMember = (props) => {
  const [users, setUsers] = useState([]);
  const textfieldRef = useRef();

  useEffect(() => {
    fetchUsersToAdd(props.groupId, setUsers);
  }, []);

  const onChangeHandler = async (event) => {
    if (!event.target?.id) {
      return;
    }
    selectedUserId = event.target.id;
  };

  const onAddMember = async () => {
    const text = textfieldRef.current;

    const user = await addUserToGroup(props.groupId, selectedUserId, setUsers);

    if (users) {
      props.onSelectUser?.(user);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ width: "100%", justifyContent: "flex-end" }}
    >
      <Autocomplete
        id="group-add-member"
        options={users}
        getOptionLabel={(option) => option.firstname + " " + option.lastname}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option._id} id={option._id}>
            {option.firstname} {option.lastname}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add User"
            sx={{ display: "flex", flex: 1 }}
          />
        )}
        onChange={onChangeHandler}
        sx={{ width: "40%" }}
      />

      <Button
        variant="contained"
        sx={{ alignSelf: "center" }}
        onClick={onAddMember}
      >
        Add
      </Button>
    </Stack>
  );
};

export default GroupAddMember;
