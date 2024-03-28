import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import { getGuesses, submitGuess, submitHint } from "../actions/guessActions";

const initialState = {
  currentCountryIndex: 0,
  guesses: [], // holds objects { guessNum, guess, guessFlag, guessCode, isCorrect, distance, driection, proximityPercentage, hintUsed}
  isCorrect: null,
  isComplete: false,
  loading: false,
  error: null,
  message: "",
};

const guessSlice = createSlice({
  name: "guess",
  initialState,
  reducers: {
    addGuess: (state, action) => {
      state.guesses.push(action.payload);
    },
    resetGuessState: (state) => {
      state.guesses = [];
      state.isCorrect = null;
      state.loading = false;
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(REHYDRATE, (state, action) => {
        // Check if the payload is undefined before trying to access properties
        if (action.payload) {
          state.guesses = action.payload.guess?.guesses ?? initialState.guesses;
        } else {
          // If the payload is undefined, set the state to the initial state
          return initialState;
        }
      })
      .addCase(submitGuess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitGuess.fulfilled, (state, action) => {
        state.loading = false;
        state.isCorrect = action.payload.isCorrect;
        state.message = action.payload.message;
        state.currentCountryIndex = action.payload.currentCountryIndex;
        state.isComplete = action.payload.isComplete;

        // Check if guesses is an array before trying to push to it
        if (!Array.isArray(state.guesses)) {
          // If it's not an array, replace it with an array containing the new guess
          state.guesses = [action.payload.guess];
        } else {
          // If it is an array, push the new guess
          state.guesses.push(action.payload.guess);
        }
      })
      .addCase(submitGuess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getGuesses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGuesses.fulfilled, (state, action) => {
        state.loading = false;
        state.guesses = action.payload.guesses;
        state.currentCountryIndex = action.payload.currentCountryIndex;
        state.isComplete = action.payload.isComplete;
      })
      .addCase(getGuesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitHint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitHint.fulfilled, (state, action) => {
        state.loading = false;

        state.guesses.push(action.payload.hintDetails);
      })
      .addCase(submitHint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGuessState } = guessSlice.actions;
export default guessSlice.reducer;
