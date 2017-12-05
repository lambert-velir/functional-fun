import React from "react";

import PanelsContainer from "../containers/PanelsContainer.js";
import LoadContainer from "../containers/LoadContainer.js";

export default function App(props){

  return (
    <div className="container">
      <div className="container__top">
        <img src="img/lamda.png" alt="lambda" /> <LoadContainer />
      </div>
      <div className="container__bottom">
        <PanelsContainer />
      </div>
    </div>
  );
}
