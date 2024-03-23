import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// async thunk action for fetching user stats
export const fetchUserStats = createAsyncThunk(
  "userStats/fetchUserStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/stats", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user stats");
      }
      const userState = await response.json();
      return userState;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userStatsSlice = createSlice({
  name: "userStats",
  initialState: {
    stats: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStats.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default userStatsSlice.reducer;
