# Geography Genius - A Geography Guessing Game

**Geography Genius** is a Wordle-type game inspired by [Tradle](https://games.oec.world/en/tradle/) and [Worldle](https://worldle.teuteuf.fr/), which themselves draw inspiration from [Wordle](https://www.nytimes.com/games/wordle/index.html). This game challenges your geographical knowledge by asking you to identify countries based on their outlines, with a new challenge every day.

## Features

- **Daily Country Outline Challenge:** Each day brings three new country outlines to guess.
- **Limited Guesses:** You have six attempts to guess all countries.
- **Hints:** Sacrifice a guess to receive a hint, revealing the country's capital, continent, or flag.
- **Feedback Mechanism:** Provides distance, direction and proximity feedback after each guess.
- **Personal Stats:** Tracks your games played, wins, guesses, and streaks.
- **Social Sharing (Upcoming):** Allows sharing daily performance on social media.
- **Leaderboard (Upcoming):** Ranks the top players.

## Technologies

### Front End

- **Framework:** React with Vite for development.
- **State Management** React Redux/Redux Toolkit.
- **Routing** React Router.
- **Styling:** TailwindCSS and DaisyUI.
- **Icons:** FontAwesome.

### Back End

- **Server:** Node.js and Express.
- **Authentication:** Google OAuth 2.0 & Passport.js.
- **Database:** MongoDB with Mongoose.

## Data Sources

- **Country Information:** [Rest Countries API](https://restcountries.com/).
- **Country Outlines:** GeoJSON data from [Natural Earth](https://www.naturalearthdata.com/).

## Experience Geography Genius

The game is live [here](https://geography-genius-production.up.railway.app/)!

## Acknowledgments

- Rest Countries API and Natural Earth for the critical data used in this game.
- Inspired by Tradle and Worldle, paying homage to the original Wordle game.
