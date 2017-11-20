import { connect } from "react-redux";
import { selectExample } from "../redux/examples/examplesActions.js";

import Examples from "../components/Examples/Examples.jsx";

function mapStateToProps(state){
  return {
    examples: state.examples
  };
}

function mapDispatchToProps(dispatch){
  return {
    onChange: (slug) => dispatch(selectExample(slug))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Examples);
