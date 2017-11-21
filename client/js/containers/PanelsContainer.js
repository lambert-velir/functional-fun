import { connect } from "react-redux";
import { setSize } from "../redux/split/splitActions.js";

import Panels from "../components/Panels/Panels.jsx";

function mapStateToProps(state){
  return {
    sizes: [state.split]
  };
}

function mapDispatchToProps(dispatch){
  return {
    onResize: (size) => dispatch(setSize(size))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Panels);
