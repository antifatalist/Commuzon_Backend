const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  // id field automatically added on post

  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
