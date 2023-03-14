const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Session = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
});

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshTokens: {
    type: [Session],
    default: [],
  },
});

module.exports = mongoose.model("User", User);
