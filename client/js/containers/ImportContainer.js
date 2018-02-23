import { connect } from "react-redux";
import { prependCode } from "../redux/code/codeActions.js";

import Import from "../components/Import/Import.jsx";

function mapStateToProps(state){
  return {
    code: state.code
  };
}

function mapDispatchToProps(dispatch){
  return {
    onImport: (code) => dispatch(prependCode(code))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Import);
