const mongoose = require("mongoose");
const requestSchema = require("./Request");

const options = { discriminatorKey: "kind" };

const OtherNeedsSchema = mongoose.Schema({
  refrigeration: {
    type: Boolean,
    required: false,
  },
  fragile: {
    type: Boolean,
    required: false,
  },
});

const communityRequestSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    otherNeeds: {
      type: OtherNeedsSchema,
      required: false,
    },
    addressees: {
      // TODO: This will be a custom Schema
      type: String,
      required: true,
    },
  },
  options
);

const CommunityRequest = Request.discriminator(
  "CommunityRequest",
  communityRequestSchema
);

module.exports = CommunityRequest;
