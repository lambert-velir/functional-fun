import React from "react";
import PanelsContainer from "../containers/PanelsContainer.js";
import MenuContainer from "../containers/MenuContainer.js";

export default function App(props) {
  return (
    <div className="container">
      <div className="container__top menu">
        <MenuContainer />
      </div>
      <div className="container__bottom">
        <PanelsContainer />
      </div>
    </div>
  );
}
