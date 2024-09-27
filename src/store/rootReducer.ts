import { combineReducers } from "redux";

import wheatherReducer from "./wheather-store/reducer";
const rootReducer = combineReducers({
  wheather: wheatherReducer,
});

export default rootReducer;
