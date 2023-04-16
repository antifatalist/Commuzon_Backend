const express = require("express");
const Product = require("../models/Product");
const validateToken = require("../validate");

const router = express.Router();

router.get("/", validateToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", validateToken, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    productId: req.body.productId,
    produerId: req.body.producerId,
    possessorId: req.body.possessorId,
    location: req.body.location,
    condition: req.body.condition,
    dateProduced: req.body.dateProduced,
    locationProduced: req.body.locationProduced,
    photosUrl: req.body.photosUrl,
  });

  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", validateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  try {
    const removedProduct = await Product.remove({ _id: req.params.id });
    res.json(removedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id", validateToken, async (req, res) => {
  try {
    const updatedProduct = await Product.updateOne(
      { _id: req.params.id },
      { $set: { name: req.params.name } }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
