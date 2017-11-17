import React from "react";


import CodeContainer from "../../containers/CodeContainer.js";

const Panels = (props) => {

  const handleChange = size => {
    console.log("SIZE", size);
  };

  return (
    <div className="panel">
      <div className="panel__left">
        <CodeContainer width={500} height={500} />
      </div>
      <div className="panel__right">
        console
      </div>
    </div>
  );
};


export default Panels;
