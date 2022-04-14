import { combineReducers } from "redux";
import posts from "./posts";
import Auth from "./Auth";
import currentPostReducer from "./currentPost";

export default combineReducers({
  posts,
  currentPostReducer,
  Auth,
});
