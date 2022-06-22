import { Container } from "@mui/material";
import { useState } from "react";
import GroupList from "../../components/group-list";

const Groups = () => {
  return (
    <Container maxWidth="md">
      <GroupList />
    </Container>
  );
};

export default Groups;
