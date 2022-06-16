import { Container, Tabs, Tab, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import GroupList from "../../components/group-list";

const Groups = () => {
  const [tab, setTab] = useState(0);
  console.log("GROUP");

  useEffect(() => {
    console.log("mount");

    return () => {
      console.log("unmout");
    };
  }, []);

  return (
    <Container maxWidth="md">
      <GroupList />
    </Container>
  );
};

export default Groups;