const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  alpha3Code: {
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
  maxDistance: {
    type: Number,
    default: 0,
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
  outlineImageUrl: {
    type: String,
    required: true,
  },
  lastUsed: {
    type: Date,
    default: null, // 'null' indicates that the country hasn't been used yet
  },
});

module.exports = mongoose.model("Country", countrySchema);
