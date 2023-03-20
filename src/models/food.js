const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Food = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 2.5,
  },
  cost: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Food", Food);
