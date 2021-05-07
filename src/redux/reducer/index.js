import { combineReducers } from "redux";
import GeneralReducer from "./general.reducer";

export default combineReducers({
  general: GeneralReducer
});
