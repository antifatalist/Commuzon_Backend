const express = require("express");
const Item = require("../models/Item");
const validateToken = require("../validate");

const router = express.Router();

router.get("/", validateToken, async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", validateToken, async (req, res) => {
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

router.get("/:id", validateToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  try {
    const removedItem = await Item.remove({ _id: req.params.id });
    res.json(removedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id", validateToken, async (req, res) => {
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
