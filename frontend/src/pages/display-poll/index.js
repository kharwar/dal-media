import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Poll } from "../../components";
import { apiRoutes, ServiceManager } from "../../services";
import { useParams } from "react-router-dom";

const DisplayPoll = () => {
  const [polls, setPolls] = useState([]);
  const params = useParams();

  useEffect(() => {
    ServiceManager.getInstance()
      .request(apiRoutes.getPolls)
      .then((res) => {
        setPolls(res["data"]);
      })
      .catch((error) => {});
  }, []);

  return (
    <Container>
      {polls
        .filter((p) => p.groupId.toString() === params.id.toString())
        .map((pp) => (
          <Poll
            title={pp.title}
            question={pp.question}
            option={pp.option}
            key={pp._id}
          />
        ))}
    </Container>
  );
};

export default DisplayPoll;
