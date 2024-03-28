import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../utils/config";

// async thunk action for submitting a guess
export const submitGuess = createAsyncThunk(
  "guess/submitGuess",
  async ({ challengeId, guess, guessNum }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/challenge/guess/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ challengeId, guess, guessNum }),
      });
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

// async thunk action for getting all guesses for a challenge
export const getGuesses = createAsyncThunk(
  "guess/getGuesses",
  async (challengeId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/challenge/guess/get/${challengeId}`,
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

// async thunk action for submitting a hint
export const submitHint = createAsyncThunk(
  "guess/submitHint",
  async (challengeId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/challenge/guess/hint/${challengeId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit hint");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);
