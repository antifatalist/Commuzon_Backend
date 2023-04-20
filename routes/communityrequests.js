const express = require("express");
const CommunityRequest = require("../models/CommunityRequest");
const validateToken = require("../validate");

const router = express.Router();

router.get("/", validateToken, async (req, res) => {
  try {
    const communityrequests = await CommunityRequest.find();
    res.json(communityrequests);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", validateToken, async (req, res) => {
  const communityrequest = new CommunityRequest({
    requesterId: req.body.requesterId,
    description: req.body.description,
    addressees: req.body.addressees,
    dateNeeded: req.body.dateNeeded,
    shippingPreferences: req.body.shippingPreferences,
  });

  try {
    const savedCommunityRequest = await communityrequest.save();
    res.json(savedCommunityRequest);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", validateToken, async (req, res) => {
  try {
    const communityrequest = await CommunityRequest.findById(req.params.id);
    res.json(communityrequest);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  try {
    const removedCommunityRequest = await CommunityRequest.remove({
      _id: req.params.id,
    });
    res.json(removedCommunityRequest);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id", validateToken, async (req, res) => {
  try {
    const updatedCommunityRequest = await CommunityRequest.updateOne(
      { _id: req.params.id },
      { $set: { name: req.params.name } }
    );
    res.json(updatedCommunityRequest);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
