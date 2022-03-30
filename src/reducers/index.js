import { combineReducers } from "redux";
import posts from "./posts";
import currentPostReducer from "./currentPost";

export default combineReducers({
  posts,
  currentPostReducer,
});
