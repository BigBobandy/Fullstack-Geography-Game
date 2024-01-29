const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Creates a partial index allowing for null values
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true, // Sparse to allow null if the user registered with a provider that didn't require an email
    },
    profileImage: {
      type: String,
    },
    displayName: {
      type: String, // A display name that could be sourced from any OAuth provider or set by the user
    },
  },
  { timestamps: true }
);

// Indexes for each OAuth provider ID
userSchema.index({ googleId: 1 }, { unique: true, sparse: true });
userSchema.index({ githubId: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("User", userSchema);
