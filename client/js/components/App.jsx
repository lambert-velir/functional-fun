import React from "react";

import Panels from "./Panels/Panels.jsx";
import ExamplesContainer from "../containers/ExamplesContainer.js";

export default function App(props){

  return (
    <div className="container">
      <div className="container__top">
        Functional Workshop <ExamplesContainer />
      </div>
      <div className="container__bottom">
        <Panels />
      </div>
    </div>
  );
}
