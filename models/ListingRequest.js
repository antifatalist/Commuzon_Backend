const mongoose = require("mongoose");
const requestSchema = require("./Request");

const options = { discriminatorKey: "kind" };

const listingRequestSchema = new mongoose.Schema(
  {
    listingId: {
      type: Number,
      required: true,
    },
  },
  options
);
const ListingRequest = Request.discriminator(
  "ListingRequest",
  listingRequestSchema
);

module.exports = ListingRequest;
