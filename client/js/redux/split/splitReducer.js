import { SIZE_CHANGE } from "./splitActions.js";

const initialState = 0.7;

export default function splitReducer(state = initialState, action){

  switch(action.type) {

    case SIZE_CHANGE: {
      const { size } = action.payload;
      return size;
    }

    default:
      return state;
  }
}
