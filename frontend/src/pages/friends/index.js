import { Container } from "@mui/system";
import React from "react";
import { FriendsList } from "../../components";
const Friends = () => {
  return (
    <Container maxWidth="md">
      <FriendsList />
    </Container>
  );
};

export default Friends;
