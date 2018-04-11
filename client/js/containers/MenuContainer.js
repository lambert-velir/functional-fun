import { connect } from "react-redux";
import { selectExample } from "../redux/examples/examplesActions.js";
import { prependCode, rerunCode } from "../redux/code/codeActions.js";

import Menu from "../components/Menu/Menu.jsx";

function mapStateToProps(state){
  return {
    examples: state.examples,
    code: state.code
  };
}

function mapDispatchToProps(dispatch){
  return {
    onLoadChange: (slug) => dispatch(selectExample(slug)),
    onImport: (code) => dispatch(prependCode(code)),
    onRerun: () => dispatch(rerunCode())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
