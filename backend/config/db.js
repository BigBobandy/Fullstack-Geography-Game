const mongoose = require("mongoose");
require("dotenv").config();
const setUpDBEventListeners = require("./dbEvents");

const uri = process.env.ATLAS_URI;

const connectDB = async () => {
  setUpDBEventListeners();

  try {
    await mongoose.connect(uri);

    console.log("MongoDB Connected...");

    // ensure graceful shutdown of mongoose on Signal Interrupt
    // this is used more in development
    process.on("SIGINT", gracefulShutdown);
    // ensure graceful shutdown of mongoose on Signal Terminate
    // this is used more in production
    process.on("SIGTERM", gracefulShutdown);

    // Enable Mongoose debug mode in development environment
    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
    }
  } catch (err) {
    console.error(err.message);
    // Node.js method that terminates the Node.js process immediately
    // thought process is: if my application can't connect to the database there's no point in continuing to run the application
    process.exit(1);
  }
};

const gracefulShutdown = () => {
  mongoose.connection.close().then(() => {
    console.log("Mongoose connection disconnected");
    process.exit(0);
  });
};

module.exports = connectDB;
