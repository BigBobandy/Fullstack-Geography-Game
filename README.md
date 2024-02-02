# Geography Genius - App Outline

## General Concept

- A game inspired by Wordle where players guess countries based on their outline hints displayed on a world map.
- Each day, a combination of 5 countries' outlines is presented as the challenge.
- Players have a total of 6 guesses to identify each country correctly.
- The challenge progresses by revealing one country outline at a time, with the next outline being revealed only after the current one is guessed correctly.
- The objective is to successfully guess all the countries for the day.

## Front End

- **Technology**: Vite React, React Router, React Redux for State Management
- **Styling**: TailwindCSS, PostCSS, Autoprefixer, FontAwesome for Icons
- **Planned Features**:
  - User Interface for game interaction.
  - Display of daily challenge (country outline hints within a world map context).
  - Input mechanism for country guesses.
  - Feedback mechanism to guide the player to the correct answer.
  - Results page showing correct answer and player's performance.
  - Social sharing functionality.
  - (Optional) User authentication for leaderboard.

## Back End

- **Technology**: Node.js, Express, Passport.js Google Oauth 2.0 for user auth
- **Database**: MongoDB with Mongoose
- **Planned Features**:
  - API endpoints for fetching daily challenges and submitting guesses.
  - Database schema for countries (including country outlines and geographical data).
  - Database schema for leaderboard (if implementing user tracking).
  - Integration with a geographical API for distance calculations, if needed.
  - (Optional) User authentication and account management.

## Data

- **Countries and Outlines**: A dataset of countries and their outline shapes.
- **Leaderboard Data**: (If implemented) User scores and rankings.

## Functionality

- **Core Gameplay**: Guess the country based on the outline hint
- **Feedback System**: Provide hints to guide the player to the correct country.
- **Daily Challenge**: Rotate the country challenge daily, with a new set of 5 countries each day.
