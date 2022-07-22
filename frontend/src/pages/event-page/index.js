import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import EventList from "../../components/event-list";
import { apiRoutes, ServiceManager } from "../../services";

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    ServiceManager.getInstance()
      .request(apiRoutes.getEvents)
      .then((res) => {
        setEvents(res["data"]);
      })
      .catch((error) => {});
  }, []);

  return (
    <Container>
      <EventList events={events} />
    </Container>
  );
};

export default EventPage;
