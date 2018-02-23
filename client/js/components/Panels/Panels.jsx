import React from "react";
import { arrayOf, func, number } from "prop-types";
import Splitter from "./Splitter.jsx";

import CodeContainer from "../../containers/CodeContainer.js";
import ConsoleContainer from "../../containers/ConsoleContainer.js";
import ImportContainer from "../../containers/ImportContainer.js";

const propTypes = {
  sizes: arrayOf(number).isRequired,
  onResize: func.isRequired
};

const Panels = (props) => {

  const { onResize, sizes } = props;

  const handleResize = data => {
    onResize(data.percent);
  };

  return (
    <Splitter sizes={sizes} onResize={handleResize} >
      <div>
        <ImportContainer />
        <CodeContainer />
      </div>
      <ConsoleContainer />
    </Splitter>
  );
};

Panels.propTypes = propTypes;

export default Panels;
