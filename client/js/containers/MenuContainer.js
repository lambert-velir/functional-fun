import * as R from "ramda";
import { connect } from "react-redux";
import { selectExample } from "../redux/examples/examplesActions.js";
import {
  prependCode,
  rerunCode,
  formatCode,
} from "../redux/code/codeActions.js";

import Menu from "../components/Menu/Menu.jsx";

function mapStateToProps(state) {
  return {
    // exclude the first folder (00) these shouldn't be in the menu, but should still
    // load the example with the hash, eg, /#dogs
    examples: R.tail(state.examples),
    code: state.code,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoadChange: (slug) => dispatch(selectExample(slug)),
    onImport: (code) => dispatch(prependCode(code)),
    onRerun: () => dispatch(rerunCode()),
    onFormat: () => dispatch(formatCode()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
