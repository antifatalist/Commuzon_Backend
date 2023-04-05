const mongoose = require("mongoose");

const options = { discriminatorKey: "kind" };

const requestSchema = new mongoose.Schema(
  {
    requesterId: {
      type: Number,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    dateNeeded: {
      type: Date,
      required: false,
    },
    shippingPreferences: {
      type: String,
      default: "No Preference",
    },
  },
  options
);
const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
