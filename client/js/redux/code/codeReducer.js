import R from "ramda";
import { CODE_UPDATE } from "./codeActions.js";
import { SELECT_EXAMPLE } from "../examples/examplesActions.js";


const initialState = "";


export default function codeReducer(state = initialState, action, examples) {

  switch(action.type) {

    case CODE_UPDATE: {
      const { code } = action.payload;
      return code;
    }

    case SELECT_EXAMPLE: {
      const { slug } = action.payload;

      const code = R.compose(
        R.defaultTo(state),
        R.prop("code"),
        R.defaultTo({}),
        R.find(R.propEq("slug", slug))
      )(examples);

      return code;
    }

    default:
      return state;
  }
}
