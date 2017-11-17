import { connect } from "react-redux";

import Console from "../components/Console/Console.jsx";

function mapStateToProps(state){
  return {
    entries: state.console
  };
}

function mapDispatchToProps(dispatch){
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(Console);
