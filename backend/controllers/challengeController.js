const DailyChallenge = require("../models/dailyChallengeModel");
const path = require("path");

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
        "../",
        challenge.dailyCountry.outlineImageUrl
      );

      console.log("Attempting to serve imagePath: ", imagePath);
      // Directly serve the image file
      return res.sendFile(imagePath, (err) => {
        if (err) {
          console.error("Error serving file:", err);
          return res.status(404).json({ message: "Image file not found." });
        }
      });
    }
  } catch (err) {
    console.error("Error fetching daily challenge:", err);
    res.status(500).json({ message: "Error getting daily challenge" });
  }
}

module.exports = { getDailyChallenge };