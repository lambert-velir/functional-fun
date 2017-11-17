import React from "react";


import CodeContainer from "../../containers/CodeContainer.js";
import ConsoleContainer from "../../containers/ConsoleContainer.js";

const Panels = (props) => {


  return (
    <div className="panel">
      <div className="panel__left">
        <CodeContainer />
      </div>
      <div className="panel__right">
        <ConsoleContainer />
      </div>
    </div>
  );
};


export default Panels;
