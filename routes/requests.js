const express = require("express");
const Request = require("../models/Request");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const request = new Request({
    requesterId: req.body.requesterId,
    dateNeeded: req.body.dateNeeded,
    shippingPreferences: req.body.shippingPreferences,
  });

  try {
    const savedRequest = await request.save();
    res.json(savedRequest);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    res.json(request);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedRequest = await Request.remove({ _id: req.params.id });
    res.json(removedRequest);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedRequest = await Request.updateOne(
      { _id: req.params.id },
      { $set: { name: req.params.name } }
    );
    res.json(updatedRequest);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;