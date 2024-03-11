const DailyChallenge = require("../models/dailyChallengeModel");
const path = require("path");
const fs = require("fs");

async function getDailyChallenge(req, res) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const challenge = await DailyChallenge.findOne({
      challengeDate: today,
    }).populate("dailyCountry");

    if (!challenge) {
      return res.status(404).json({ message: "No daily challenge found" });
    } else {
      // Construct the path to the image file
      const imagePath = path.join(
        __dirname,
        "../assets",
        challenge.dailyCountry.outlineImageUrl
      );

      try {
        // Attempt to access the file to check its existence
        await fs.access(imagePath);
        // Serve the image file directly if the file is accessible
        res.sendFile(imagePath);
      } catch (err) {
        // If the file is not accessible, respond with an error
        res.status(404).json({ message: "Image not found" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting daily challenge" });
  }
}

module.exports = { getDailyChallenge };
