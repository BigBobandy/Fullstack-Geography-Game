/**
 * Root reducer for the Redux store.
 * Combines multiple reducers into a single reducer.
 */
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import challengeReducer from "./slices/challengeSlice";
import guessReducer from "./slices/guessSlice";
import userStatsReducer from "./slices/userStatsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  challenge: challengeReducer,
  guess: guessReducer,
  userStats: userStatsReducer,
});

export default rootReducer;
