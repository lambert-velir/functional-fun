import React from "react";

import Panels from "./Panels/Panels.jsx";


export default function App(props){

  return (
    <div className="container">
      <div className="container__top">
        Functional Workshop
      </div>
      <div className="container__bottom">
        <Panels />
      </div>
    </div>
  );
}
