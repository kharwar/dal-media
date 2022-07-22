import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import Event from "../event";
// import { events } from "../../data";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../alert-dialog";
import { snackbar } from "../../components";
import { apiRoutes, ServiceManager } from "../../services";

const EventList = (props) => {
  const [events, setEvents] = useState(props.events);
  const { setAlert, setOnAgree } = useAlert();
  const navigate = useNavigate();
  const eventRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setEvents(props.events);
    setOnAgree(onDelete);
  }, []);

  const handleMenu = (event, e) => {
    eventRef.current = e;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    const event = eventRef.current;
    navigate(`edit-event`, { state: { event } });
  };

  const onDelete = () => {
    const id = eventRef.current["_id"].toString();

    ServiceManager.getInstance()
      .request(apiRoutes.deleteEvent + "/" + id, {}, "delete")
      .then((res) => {
        //setEvents(events.filter(event => (event["_id"] !== eventRef.current["_id"])));
        snackbar.current.showSnackbar(true, "Event Deleted");
        navigate(0);
      })
      .catch((error) => {});
  };

  const handleDelete = (event) => {
    handleClose();
    setAlert(
      true,
      "Delete Event",
      "Are you sure you want to delete this event?"
    );
  };

  const renderEvent = useCallback((e) => {
    return (
      <Event
        event={e}
        key={e._id}
        handleMenu={(event) => handleMenu(event, e)}
      />
    );
  }, []);

  return (
    <>
      {props.events.map(renderEvent)}
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default EventList;
