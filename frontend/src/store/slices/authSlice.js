import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// async action for fetching user data
export const fetchUserProfile = createAsyncThunk(
  // action type for this async action
  "auth/fetchUserProfile",
  async () => {
    const response = await fetch("http://localhost:3000/api/user/profile");
    const userData = await response.json();
    return userData;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  // this handles the three action types dispatched by the fetchUserProfile async action
  extraReducers: (builder) => {
    builder
      // request starts
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      // request successful
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      // request failed
      .addCase(fetchUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.error.message || "Failed to fetch user profile";
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
