const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();

app.use(bodyParser.json());

//Import routes
const itemsRoute = require("./routes/items");

app.use("/api/items", itemsRoute);

//ROUTES

app.get("/api", (req, res) => {
  res.send("We are on home");
});

//Connect to DB
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to DB!");
});

app.listen(process.env.API_SERVER_PORT, () => {
  console.log(`API Server running on ${process.env.API_SERVER_PORT}...`);
});
