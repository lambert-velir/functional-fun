import codeReducer from "./code/codeReducer.js";
import splitReducer from "./split/splitReducer.js";
import consoleReducer from "./console/consoleReducer.js";
import examplesReducer from "./examples/examplesReducer.js";


// inital state
const initialState = {};

// reducer function
function rootReducer(state = initialState, action) {

  const examples = examplesReducer(state.examples, action);

  return {
    code: codeReducer(state.code, action, examples),
    console: consoleReducer(state.console, action),
    examples,
    split: splitReducer(state.split, action)
  };

}


export default rootReducer;
