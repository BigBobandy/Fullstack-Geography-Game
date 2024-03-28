import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../utils/config";

// async thunk action for fetchin the daily challenge
export const fetchDailyChallengeImages = createAsyncThunk(
  "challenge/fetchDailyChallengeImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/challenge/daily`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch daily challenge image");
      }
      const data = await response.json();

      // data.imageUrls is an array of URLs
      const imageUrls = data.imageUrls;

      return { imageUrls };
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
      const response = await fetch(`${apiUrl}/api/challenge/daily/id`, {
        credentials: "include",
      });
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
    imageUrls: [],
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
      .addCase(fetchDailyChallengeImages.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchDailyChallengeImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.imageUrls = action.payload.imageUrls;
        state.isError = false;
      })
      .addCase(fetchDailyChallengeImages.rejected, (state, action) => {
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
