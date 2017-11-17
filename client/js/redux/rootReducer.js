import codeReducer from "./code/codeReducer.js";
import splitReducer from "./split/splitReducer.js";


// inital state
const initialState = {};

// reducer function
function rootReducer(state = initialState, action) {
  
  return {
    code: codeReducer(state.code, action),
    split: splitReducer(state.split, action)
  };

}


export default rootReducer;
