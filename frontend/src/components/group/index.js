import { Container, Tabs, Tab, Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FileList from "./file-list";
import GroupManage from "./group-manage";
import PostList from "../post-list";
import { DisplayPoll } from "../../pages";
import { apiRoutes, ServiceManager } from "../../services";

const Group = () => {
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getGroupPosts();
  }, []);

  const getGroupPosts = async () => {
    try {
      const { data } = await ServiceManager.getInstance().request(
        apiRoutes.getPosts,
        { groupId: params.id }
      );
      setPosts(data);
    } catch (error) {}
  };

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
        <PostList posts={posts} groupId={params.id} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <FileList groupId={params.id} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Box>
          <Box sx={{ m: 1 }}>
            <Button
              onClick={() => navigate("./create-poll")}
              variant="contained"
              component="span"
              sx={{
                backgroundColor: "#2c3e50",
              }}
            >
              Create
            </Button>
          </Box>
          <DisplayPoll groupId={params.id} />
        </Box>
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <GroupManage groupId={params.id} createdBy={state?.createdBy} />
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
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
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

export default Group;
