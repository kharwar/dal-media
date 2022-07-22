import { Container, Tabs, Tab, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { posts } from "../../data";
import FileList from "../group/file-list";
import GroupManage from "../group/group-manage";
import PostList from "../post-list";
import { useParams } from "react-router-dom";

const Groups = () => {
  const params = useParams();
  const [tab, setTab] = useState(0);

  const onTabChanged = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={onTabChanged}>
          <Tab label="News Feed" {...a11yProps(0)} />
          <Tab label="Shared Files" {...a11yProps(1)} />
          <Tab label="Polls" {...a11yProps(2)} />
          <Tab label="Manage" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <PostList posts={posts} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <FileList />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        Polls
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <GroupManage />
      </TabPanel>
    </Container>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    "id": `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default Groups;
