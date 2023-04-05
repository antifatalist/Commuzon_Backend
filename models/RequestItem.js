const mongoose = require("mongoose");

const requestItemSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    dateCreated: {
      type: Date,
      required: true,
    },
    dateNeeded: {
      type: Date,
      required: false,
    },
  },
  options
);
const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
