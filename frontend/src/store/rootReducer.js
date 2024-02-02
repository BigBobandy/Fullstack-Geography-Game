/**
 * Root reducer for the Redux store.
 * Combines multiple reducers into a single reducer.
 */
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
