import { connect } from "react-redux";

import CodeEditor from "../components/CodeEditor/CodeEditor.jsx";
import { sizeChange } from "../redux/split/splitActions.js";
import { updateCode } from "../redux/code/codeActions.js";

function mapStateToProps(state){
  const { width, height } = state.split;

  return { width, height };
}

function mapDispatchToProps(dispatch){
  return {
    onSizeChange: (size) => dispatch(sizeChange(size)),
    onCodeChange: (code) => dispatch(updateCode(code))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);
