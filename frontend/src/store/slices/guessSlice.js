import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

// async thunk action for submitting a guess
export const submitGuess = createAsyncThunk(
  "guess/submitGuess",
  async ({ challengeId, guess, guessNum }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/challenge/guess/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ challengeId, guess, guessNum }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit guess");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const getGuesses = createAsyncThunk(
  "guess/getGuesses",
  async (challengeId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/challenge/guess/get/${challengeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get guesses");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

const initialState = {
  guesses: [], // holds objects { guess, guessNum, isCorrect, guessFlag, guessCode}
  isCorrect: null,
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
        console.log("Rehydration payload:", action.payload);
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

        // Check if guesses is an array before trying to push to it
        if (!Array.isArray(state.guesses)) {
          console.error("state.guesses is not an array:", state.guesses);
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
        state.guesses = action.payload;
      })
      .addCase(getGuesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGuessState } = guessSlice.actions;
export default guessSlice.reducer;
