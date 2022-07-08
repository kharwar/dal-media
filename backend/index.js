const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./src/routes");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => res.send("Dal Media"));
app.use("/api", router);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MongoDB Connected!");
    app.listen(port, () =>
      console.log(`DalMedia Backend listening on port ${port}!`)
    );
  })
  .catch((e) => {
    console.log("Mongoose Connection Error");
    process.exit(1);
  });
