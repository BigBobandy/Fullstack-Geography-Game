const DailyChallenge = require("../models/dailyChallengeModel");
const path = require("path");

// handles serving the daily challenge image
async function getDailyChallenge(req, res) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const challenge = await DailyChallenge.findOne({
      challengeDate: today,
    }).populate("dailyCountries");

    if (!challenge) {
      return res.status(404).json({ message: "No daily challenge found" });
    } else {
      // Map through the dailyCountries array to construct image URLs for each country
      const imageUrls = challenge.dailyCountries.map((country) => {
        // Construct the server-side file path
        let imagePath = path.join(__dirname, "../", country.outlineImageUrl);

        // Convert the server-side file path to a URL
        let relativePath = path.relative(
          path.join(__dirname, "../assets"),
          imagePath
        );
        let imageUrl =
          `http://localhost:3000/assets/outline/${relativePath}`.replace(
            /\\/g,
            "/"
          );

        return imageUrl;
      });

      console.log("Attempting to serve imageUrls: ", imageUrls);

      // send the image URLs to the client
      return res.json({ imageUrls });
    }
  } catch (err) {
    console.error("Error fetching daily challenge:", err);
    res.status(500).json({ message: "Error getting daily challenge" });
  }
}

// handles sending the challenge ID for the current day
async function getChallengeId(req, res) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const challenge = await DailyChallenge.findOne(
      {
        challengeDate: today,
      },
      "_id"
    );

    if (!challenge) {
      return res.status(404).json({ message: "No daily challenge found" });
    } else {
      return res.json({ challengeId: challenge._id });
    }
  } catch (err) {
    console.error("Error fetching challenge ID:", err);
    res.status(500).json({ message: "Error getting challenge ID" });
  }
}

module.exports = { getDailyChallenge, getChallengeId };
