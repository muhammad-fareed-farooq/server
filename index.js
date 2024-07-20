require("dotenv").config();

const cors = require("cors");
const { database_Connect } = require("./database/database_Connect");
const all_Routes = require("./routes/index");

const express = require("express");
const app = express();

let corsOption = {
  origin: "http://192.168.100.51:5000",
  methods: "GET,POST",
  credentials: true,
};

app.use(cors(corsOption));

app.use(express.json());

database_Connect();

app.use(all_Routes);

app.listen(process.env.PORT, () => {
  console.log("server is runnung", process.env.PORT);
});
