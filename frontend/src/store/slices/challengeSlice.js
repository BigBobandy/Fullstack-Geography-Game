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

export const challengeSlice = createSlice({
  name: "challenge",
  initialState: {
    imageUrl: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyChallengeImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDailyChallengeImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.imageUrl = action.payload.imageUrl;
      })
      .addCase(fetchDailyChallengeImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "Failed to fetch daily challenge image";
      });
  },
});

export default challengeSlice.reducer;
