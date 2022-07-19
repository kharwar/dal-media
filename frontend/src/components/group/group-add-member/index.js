import { Autocomplete, TextField } from "@mui/material";
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
    .catch((error) => {
      console.log({ error });
    });
};

const addUserToGroup = async (groupId, userId, setUsers) => {
  const params = {
    userId: userId,
  };

  ServiceManager.getInstance()
    .request(
      `${apiRoutes.groups}/${groupId}/${apiRoutes.groupMembers}`,
      params,
      "put"
    )
    .then((res) => {
      setUsers(res.data);
    })
    .catch((error) => {
      console.log({ error });
    });
};

const GroupAddMember = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersToAdd(props.groupId, setUsers);
  }, []);

  const onChangeHandler = (event) => {
    if (!event.target?.id) {
      return;
    }
    addUserToGroup(props.groupId, event.target.id, setUsers);
  };

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="group-add-member"
        options={users}
        getOptionLabel={(option) => option.firstname + " " + option.lastname}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option._id} id={option._id}>
            {option.firstname} {option.lastname}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label="Add User" />}
        onChange={onChangeHandler}
      />
    </Stack>
  );
};

export default GroupAddMember;
