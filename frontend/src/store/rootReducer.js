/**
 * Root reducer for the Redux store.
 * Combines multiple reducers into a single reducer.
 */
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import challengeReducer from "./slices/challengeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  challenge: challengeReducer,
});

export default rootReducer;
