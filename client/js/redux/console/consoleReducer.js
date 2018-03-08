import R from "ramda";
import { CONSOLE_MESSAGE, CONSOLE_MESSAGES, CLEAR_CONSOLE } from "./consoleActions.js";


const initialState = [];


export default function consoleReducer(state = initialState, action) {

  switch(action.type) {

    // type is log, error, etc;
    case CONSOLE_MESSAGE: {
      const { type, message } = action.payload;
      return R.append({
        type,
        message
      }, state);
    }

    case CONSOLE_MESSAGES: {
      const { messages } = action.payload;
      return R.concat(messages, state);
    }

    case CLEAR_CONSOLE: {
      return [];
    }

    default:
      return state;
  }
}
