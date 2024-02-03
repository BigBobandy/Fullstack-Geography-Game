# Geography Genius - App Outline

## General Concept

- A guessing game inspired by the mechanics of Tradle (which was inspired by Wordle), where players have the daily task of identifying a country from its outline.
- Each day, a single country's outline is presented as the challenge.
- Players have up to 6 guesses to identify the country correctly.
- Players can choose to sacrifice one of their guesses in exchange for a hint, such as the name of it's capital city, the continent the country is in, the image of its flag (hints progressing in this order from least to most helpful).
- With each guess, players receive feedback on the distance in kilometers from their guess to the actual country, along with a directional arrow guiding them towards the correct location.
- To add a social element, players will be able to share their daily scores on social media, extending the game's reach and encouraging friendly competition.

## Front End

- **Technology**: Vite React, React Router, React Redux for State Management
- **Styling**: TailwindCSS, PostCSS, Autoprefixer, FontAwesome for Icons
- **Planned Features**:
  - User Interface for game interaction.
  - Display of daily challenge (country outline).
  - Input mechanism for country guesses.
  - Feedback mechanism to guide the player to the correct answer.
  - Results page showing correct answer and player's performance.
  - Social sharing functionality.
  - User authentication for leaderboard.

## Back End

- **Technology**: Node.js, Express, Passport.js Google Oauth 2.0 for user auth
- **Database**: MongoDB with Mongoose
- **Planned Features**:
  - API endpoints for fetching daily challenges and submitting guesses.
  - Database schema for countries (including country outlines and geographical data).
  - Database schema for leaderboard.
  - Integration with a geographical API for distance calculations, if needed.
  - 3rd Party User authentication using Google Oauth.

## Data

- **Countries and Outlines**: The outlines of countries presented in the challenges are rendered from GeoJSON data sourced from [Natural Earth](http://www.naturalearthdata.com/).
- **Leaderboard Data**: IN-PROGRESS.

## Acknowledgments

I'm using GeoJSON data from [Natural Earth](http://www.naturalearthdata.com/), which is a fantastic resource for high-quality map data, freely available for everyone. Big thanks to them, [Lexman](http://github.com/lexman), and the [Open Knowledge Foundation](http://okfn.org/) for their contribution to open data.

All the GeoJSON data is under the [Open Data Commons Public Domain Dedication and License (PDDL)](http://opendatacommons.org/licenses/pddl/1.0/), which is really generous and helpful for projects like this one.

## Functionality

- **Core Gameplay**: The core challenge is to guess the country from its outline. Each player receives one country outline to guess per day.
- **Hints System**: Players can opt to receive a hint at the cost of one guess. Hints could reveal the capital city, the continent the country is located in, or the country's flag.
- **Distance Feedback**: After each guess, the game reveals how far off the guess was from the correct country in kilometers.
- **Directional Arrow**: Alongside the distance feedback, an arrow will point players in the direction of the actual country, aiding in the next guess.
- **Daily Challenge**: The game updates daily with a new country to guess, keeping the challenge fresh and exciting.
- **Social Sharing**: After completing the daily challenge, players can share their results on social media, promoting the game organically and inviting friends to join the fun.
