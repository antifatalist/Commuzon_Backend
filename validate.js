require("dotenv").config();
const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  //get token from request header
  const authHeader = req.headers["authorization"];
  if (authHeader === undefined) {
    res.statusMessage = "Authorization token not present";
    res.sendStatus(400).end();
    return;
  }

  const token = authHeader.split(" ")[1];
  //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
  if (token == null) {
    res.statusMessage = "Authorization token not present";
    res.sendStatus(400).end();
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.statusMessage = "Authorization token invalid";
      res.status(403).end();
    } else {
      req.user = user;
      next(); //proceed to the next action in the calling function
    }
  }); //end of jwt.verify()
} //end of function

module.exports = validateToken;
