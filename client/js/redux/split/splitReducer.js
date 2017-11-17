import { SIZE_CHANGE } from "./splitActions.js";

const initialState = {
  width: 500,
  height: 500
};

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
