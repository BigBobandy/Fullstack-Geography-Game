const User = require("../models/userSchema");

// Handles the GET request to /api/user/profile
async function getUserProfile(req, res) {
  try {
    // check if the user is logged in
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // get the user data from the database
    const user = await User.findById(req.user);

    // if user wasn't found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // if user was found return the user data
    res.json({
      profileImage: user.profileImage,
      displayName: user.displayName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getUserProfile };
