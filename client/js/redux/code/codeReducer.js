import { CODE_UPDATE } from "./codeActions.js";


const initialState = "";


export default function codeReducer(state = initialState, action) {

  switch(action.type) {

    case CODE_UPDATE: {
      const { code } = action.payload;
      return code;
    }

    default:
      return state;
  }
}
