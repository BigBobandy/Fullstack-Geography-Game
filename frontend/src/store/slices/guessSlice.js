import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

const initialState = {
  isCorrect: null,
  loading: false,
  error: null,
  message: "",
};

const guessSlice = createSlice({
  name: "guess",
  initialState,
  reducers: {
    resetGuessState: (state) => {
      state.isCorrect = null;
      state.loading = false;
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitGuess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitGuess.fulfilled, (state, action) => {
        state.loading = false;
        state.isCorrect = action.payload.isCorrect;
        state.message = action.payload.message;
      })
      .addCase(submitGuess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGuessState } = guessSlice.actions;
export default guessSlice.reducer;
