import { Container, Tabs, Tab, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PostList from "../../components/post-list";

const Groups = () => {
  const [tab, setTab] = useState(0);
  console.log("GROUP");

  useEffect(() => {
    console.log("mount");

    return () => {
      console.log("unmout");
    };
  }, []);

  const onTabChanged = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={onTabChanged}
        >
          <Tab label="News Feed" {...a11yProps(0)} />
          <Tab label="Shared Files" {...a11yProps(1)} />
          <Tab label="Polls" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <PostList />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        File Management
      </TabPanel>
      <TabPanel value={tab} index={2}>
        Polls
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default Groups;
