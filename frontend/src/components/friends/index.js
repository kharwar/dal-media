import { useCallback, useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import { apiRoutes, ServiceManager } from "../../services";
import { useAuth } from "../../context";
import { users } from "../../data";
import { Cancel, CheckCircle } from "@mui/icons-material";

const fetchFriends = async (setFriends) => {
  ServiceManager.getInstance()
    .request(apiRoutes.getFriends)
    .then((res) => {
      setFriends(res.data);
    })
    .catch((error) => {
      console.log({ error });
    });
};

const fetchRequests = async (setRequests) => {
  ServiceManager.getInstance()
    .request(apiRoutes.getRequests)
    .then((res) => {
      setRequests(res.data);
    })
    .catch((error) => {
      console.log({ error });
    });
};

const Friends = () => {
  const { loggedInUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  console.log("fileList");

  useEffect(() => {
    fetchRequests(setRequests);
    fetchFriends(setFriends);
  }, []);

  const renderUserItem = useCallback((isRequest, user) => {
    return (
      <Paper sx={{ p: 1.5, my: 1 }} key={user._id}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box sx={{ display: "flex", mr: 2 }}>
            <Avatar alt={user.firstname} src={user.image} />
          </Box>
          <Box sx={{ display: "flex", flex: 1, mr: 1 }}>
            <Typography variant="body1" sx={{ lineHeight: 1.4 }}>
              {user.firstname} {user.lastname}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flex: 1, mr: 1, justifyContent: "end" }}>
            {isRequest && (
              <>
                <IconButton>
                  <CheckCircle />
                </IconButton>
                <IconButton>
                  <Cancel />
                </IconButton>
              </>
            )}
            {!isRequest && (
              <>
                <IconButton>
                  <Cancel />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    );
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" sx={{ lineHeight: 1.4, mt: 2 }}>
        Friend Requets
      </Typography>
      {requests.map((user) => renderUserItem(true, user))}
      <Divider sx={{ my: 2 }}></Divider>
      <Typography variant="h6" sx={{ lineHeight: 1.4 }}>
        Friends
      </Typography>
      {friends.map((user) => renderUserItem(false, user))}
    </Container>
  );
};

export default Friends;
