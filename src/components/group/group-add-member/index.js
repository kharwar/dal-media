import { Paper, Autocomplete, TextField } from "@mui/material";
import React, { memo } from "react";
import { Stack } from "@mui/material";
import { users } from "../../../data";
import _ from "lodash";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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

const propsAreEqual = (prevProps, nextProps) => {
  return _.isEqual(prevProps.post, nextProps.post);
};

export default memo(GroupAddMember, propsAreEqual);
