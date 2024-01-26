const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capital: {
    type: String,
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  flag: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  subregion: {
    type: String,
    required: true,
  },
  timezones: {
    type: Array,
    required: true,
  },
  unMember: {
    type: Boolean,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Country", countrySchema);
