import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Stack } from "@mui/material";
import { users } from "../../../data";
import _ from "lodash";

const GroupAddMember = () => {
  console.log("Member");

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="group-add-member"
        options={users.map((user) => user.name)}
        renderInput={(params) => <TextField {...params} label="Add User" />}
      />
    </Stack>
  );
};

export default GroupAddMember;
