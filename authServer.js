require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//this will allow us to pull params from .env file
const express = require("express");
const app = express();
app.use(express.json());
//This middleware will allow us to pull req.body.<params>
const port = process.env.TOKEN_SERVER_PORT;

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

const users = [];
// REGISTER A USER
app.post("/createUser", async (req, res) => {
  const user = req.body.username;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  users.push({
    username: user,
    password: hashedPassword,
  });
  res.status(201).send(users);
  console.log(users);
});

//AUTHENTICATE LOGIN AND RETURN JWT TOKEN
app.post("/login", async (req, res) => {
  const user = users.find((c) => c.username == req.body.username);
  //check to see if the user exists in the list of registered users
  if (user == null) res.status(404).send("User does not exist!");
  //if user does not exist, send a 400 response
  if (await bcrypt.compare(req.body.password, user.password)) {
    const accessToken = generateAccessToken({ username: req.body.username });
    const refreshToken = generateRefreshToken({ username: req.body.username });
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } else {
    res.status(401).send("Password Incorrect!");
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
