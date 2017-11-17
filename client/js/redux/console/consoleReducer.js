import R from "ramda";
import { CONSOLE_LOG, CONSOLE_ERROR, CLEAR_CONSOLE } from "./consoleActions.js";


const initialState = [];


export default function consoleReducer(state = initialState, action) {

  switch(action.type) {

    case CONSOLE_LOG: {
      const { message } = action.payload;
      return R.append({
        type: "log",
        message
      }, state);
    }

    case CONSOLE_ERROR: {
      const { message } = action.payload;
      return R.append({
        type: "error",
        message
      }, state);
    }

    case CLEAR_CONSOLE: {
      return [];
    }

    default:
      return state;
  }
}
