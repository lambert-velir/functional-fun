import React from "react";

import Panels from "./Panels/Panels.jsx";
import LoadContainer from "../containers/LoadContainer.js";

export default function App(props){

  return (
    <div className="container">
      <div className="container__top">
        Functional Workshop <LoadContainer />
      </div>
      <div className="container__bottom">
        <Panels />
      </div>
    </div>
  );
}
