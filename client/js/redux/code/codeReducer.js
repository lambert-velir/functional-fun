import R from "ramda";
import { CODE_UPDATE, CODE_PREPEND } from "./codeActions.js";
import { SELECT_EXAMPLE } from "../examples/examplesActions.js";

import Maybe from "folktale/maybe";

const initialState = "";


export default function codeReducer(state = initialState, action, examples) {

  switch(action.type) {

    case CODE_UPDATE: {
      const { code } = action.payload;
      return code;
    }

    case CODE_PREPEND: {
      const { code } = action.payload;
      return code + state;
    }

    case SELECT_EXAMPLE: {
      const { slug } = action.payload;

      const code = R.compose(
        m => m.getOrElse(state),
        R.map(R.prop("code")),
        Maybe.fromNullable,
        R.find(R.propEq("slug", slug))
      )(examples);

      return code;
    }

    default:
      return state;
  }
}
