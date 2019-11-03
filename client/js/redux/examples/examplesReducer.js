import { INIT_EXAMPLES } from "./examplesActions.js";

const initialState = [];

export default function examplesReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_EXAMPLES: {
      const { examples } = action.payload;
      return examples;
    }

    default:
      return state;
  }
}
