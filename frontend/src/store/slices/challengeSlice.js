import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// async thunk action for fetchin the daily challenge
export const fetchDailyChallengeImage = createAsyncThunk(
  "challenge/fetchDailyChallengeImage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/challenge/daily",
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch daily challenge image");
      }
      const blob = await response.blob();

      const imageUrl = URL.createObjectURL(blob);

      return { imageUrl };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// async thunk action for fetching the daily challenge ID
export const fetchDailyChallengeId = createAsyncThunk(
  "challenge/fetchDailyChallengeId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/challenge/daily/id",
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch daily challenge ID");
      }
      const data = await response.json();
      return { challengeId: data.challengeId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const challengeSlice = createSlice({
  name: "challenge",
  initialState: {
    imageUrl: null,
    challengeId: null,
    previousChallengeId: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling the image fetch actions
      .addCase(fetchDailyChallengeImage.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchDailyChallengeImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.imageUrl = action.payload.imageUrl;
        state.isError = false;
      })
      .addCase(fetchDailyChallengeImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "Failed to fetch daily challenge image";
      })
      .addCase(fetchDailyChallengeId.fulfilled, (state, action) => {
        // Check if the new challenge ID is different from the current challenge ID
        if (state.challengeId !== action.payload.challengeId) {
          state.previousChallengeId = state.challengeId; // Store the previous challenge ID
          state.challengeId = action.payload.challengeId; // Update to the new challenge ID
          // Here you can dispatch resetGuessState if your app structure allows
          // Or handle this logic outside in a component where dispatch is available
        }
      })
      .addCase(fetchDailyChallengeId.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default challengeSlice.reducer;
