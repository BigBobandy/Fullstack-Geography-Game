# Locadle (name is a work-in-progress) - App Outline

## General Concept

- A Wordle-style game where players guess a country based on the capital city hint.
- Players receive distance feedback in kilometers for each guess.
- The objective is to guess the correct country within 5 attempts.
- A new country challenge is presented daily.

## Front End

- **Technology**: Vite React
- **Styling**: TailwindCSS, PostCSS, Autoprefixer
- **Current State**: Initial setup complete, no specific features implemented yet.
- **Planned Features**:
  - User Interface for game interaction.
  - Display of daily challenge (capital city hint).
  - Input mechanism for country guesses.
  - Feedback display showing distance from the correct answer.
  - Results page showing correct answer and player's performance.
  - Social sharing functionality.
  - (Optional) User authentication for leaderboard.

## Back End

- **Technology**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Current State**: Basic setup complete, no endpoints or database schema defined yet.
- **Planned Features**:
  - API endpoints for fetching daily challenge and submitting guesses.
  - Database schema for countries (including capital cities and geographical data).
  - Database schema for leaderboard (if implementing user tracking).
  - Integration with a geographical API for distance calculations.
  - (Optional) User authentication and account management.

## Data

- **Countries and Capitals**: A dataset of countries, their capital cities, and geographical coordinates.
- **Leaderboard Data**: (If implemented) User scores and rankings.

## Functionality

- **Core Gameplay**: Guess the country based on the capital city hint within limited attempts.
- **Distance Calculation**: Provide feedback on how far the guess is from the correct country.
- **Daily Challenge**: Rotate the country challenge daily.
