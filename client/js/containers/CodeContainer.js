import { connect } from "react-redux";

import CodeEditor from "../components/CodeEditor/CodeEditor.jsx";
import { sizeChange } from "../redux/split/splitActions.js";
import { updateCode } from "../redux/code/codeActions.js";

function mapStateToProps(state, ownProps) {
  return {
    code: state.code,
    containerSize: state.split, // here to force a re-render
    ...ownProps,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSizeChange: size => dispatch(sizeChange(size)),
    onCodeChange: code => dispatch(updateCode(code)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeEditor);
