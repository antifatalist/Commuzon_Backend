require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

//this will allow us to pull params from .env file
const express = require("express");
const app = express();
app.use(express.json());
//This middleware will allow us to pull req.body.<params>
const port = process.env.TOKEN_SERVER_PORT;

//Connect to DB
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to DB!");
});

// accessTokens
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
// refreshTokens
let refreshTokens = [];
function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
}

app.post("/createUser", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  try {
    console.log(user);
    const savedUser = await user.save();
    res.statusMessage = "User created";
    res.sendStatus(201).end();
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/login", async (req, res) => {
  var user = "";
  try {
    user = await User.findOne({ username: req.body.username });
  } catch (err) {
    console.log(err);
    res.statusMessage = "User not found";
    res.sendStatus(404).end();
    return;
  }

  if (user == null) {
    res.statusMessage = "User not found";
    res.sendStatus(404).end();
    return;
  }

  //if user does not exist, send a 400 response
  if (await bcrypt.compare(req.body.password, user.password)) {
    const accessToken = generateAccessToken({ username: req.body.username });
    const refreshToken = generateRefreshToken({ username: req.body.username });
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } else {
    res.statusMessage = "Password incorrect";
    res.sendStatus(401).end();
  }
});

//REFRESH TOKEN API
app.post("/refreshToken", (req, res) => {
  if (!refreshTokens.includes(req.body.token)) {
    res.status(400).send("Refresh Token Invalid");
  }
  refreshTokens = refreshTokens.filter((c) => c != req.body.token);
  //remove the old refreshToken from the refreshTokens list
  const accessToken = generateAccessToken({ username: req.body.username });
  const refreshToken = generateRefreshToken({ username: req.body.username });
  //generate new accessToken and refreshTokens
  res.json({
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((c) => c != req.body.refreshToken);
  //remove the old refreshToken from the refreshTokens list
  res.statusMessage = "Logged out";
  res.status(204).end();
});

//get the port number from .env file
app.listen(port, () => {
  console.log(`Authorization Server running on ${port}...`);
});
