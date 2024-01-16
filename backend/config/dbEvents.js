const mongoose = require("mongoose");

const setUpDBEventListeners = () => {
  // Set up connection event listeners
  const db = mongoose.connection;
  db.on("connected", () => {
    console.log("Mongoose connection is open");
  });

  db.on("error", (err) => {
    console.error(`Mongoose connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("Mongoose connection is disconnected");
  });

  db.on("reconnected", () => {
    console.log("Mongoose reconnected to the database.");
  });
};

module.exports = setUpDBEventListeners;
