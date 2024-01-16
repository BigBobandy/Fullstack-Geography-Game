const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URL);

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Node.js method that terminates the Node.js process immediately
    // thought process is: if my application can't connect to the database there's no point in continuing to run the application
    process.exit(1);
  }
};

module.exports = connectDB;
