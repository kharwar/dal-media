import { useCallback, useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  Paper,
  Avatar,
  IconButton,
  Autocomplete,
  TextField,
  InputBase,
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
    .catch((error) => {});
};

const fetchRequests = async (setRequests) => {
  ServiceManager.getInstance()
    .request(apiRoutes.getRequests)
    .then((res) => {
      setRequests(res.data);
    })
    .catch((error) => {});
};

const FriendsList = () => {
  const { loggedInUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const reverseUsers = [...users].reverse();
    setFriends(reverseUsers);
    setRequests(users);
  }, []);

  const renderUserItem = useCallback((isRequest, user) => {
    return (
      <Box sx={{ py: 0.5, my: 1 }} key={user._id}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box sx={{ display: "flex", mr: 2 }}>
            <Avatar alt={user.name} src={user.image} />
          </Box>
          <Box sx={{ display: "flex", flex: 2, mr: 1 }}>
            <Typography variant="body1" sx={{ lineHeight: 1.4 }}>
              {/* {user.firstname} {user.lastname} */}
              {user.name}
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
      </Box>
    );
  }, []);

  return (
    // <Container maxWidth="md">
    <Paper varaint="outlined" sx={{ p: 2 }}>
      <Autocomplete
        id="group-add-member"
        options={friends}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.id} id={option.id}>
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Search Friend" />
        )}
      />
      <Typography variant="h6" sx={{ lineHeight: 1.4, mt: 2 }}>
        Friend Requets
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ height: "30vh", overflowY: "scroll" }}>
        {requests.map((user) => renderUserItem(true, user))}
      </Box>
      <Divider sx={{ my: 2 }}></Divider>
      <Typography variant="h6" sx={{ lineHeight: 1.4 }}>
        Friends
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ height: "70vh", overflowY: "scroll" }}>
        {friends.map((user) => renderUserItem(false, user))}
      </Box>
    </Paper>
    // </Container>
  );
};

export default FriendsList;
