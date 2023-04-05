const express = require("express");
const Listing = require("../models/Listing");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const listing = new Listing({
    itemId: req.body.itemId,
    providerId: req.body.providerId,
    dateAvailable: req.body.dateAvailable,
    locationAvailable: req.body.locationAvailable,
    photosUrl: req.body.photosUrl,
    deliveryOptionsAvailable: req.body.deliveryOptionsAvailable,
  });

  try {
    const savedListing = await listing.save();
    res.json(savedListing);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.json(listing);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedListing = await Listing.remove({ _id: req.params.id });
    res.json(removedListing);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedListing = await Listing.updateOne(
      { _id: req.params.id },
      { $set: { name: req.params.name } }
    );
    res.json(updatedListing);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
