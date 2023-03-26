const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Item = require("../models/Item");

const router = express.Router();

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

router.get("/", validateToken, async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const item = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    productId: req.body.productId,
    producerId: req.body.producerId,
    possessorId: req.body.possessorId,
    location: req.body.location,
    condition: req.body.condition,
    dateProduced: req.body.dateProduced,
    locationProduced: req.body.locationProduced,
    photosUrl: req.body.photosUrl,
  });

  try {
    const savedItem = await item.save();
    res.json(savedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedItem = await Item.remove({ _id: req.params.id });
    res.json(removedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.updateOne(
      { _id: req.params.id },
      { $set: { name: req.params.name } }
    );
    res.json(updatedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
