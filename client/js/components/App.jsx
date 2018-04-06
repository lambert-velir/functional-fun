import React from "react";
import PanelsContainer from "../containers/PanelsContainer.js";
import LoadContainer from "../containers/LoadContainer.js";
import Dropdown from "./Dropdown/Dropdown.jsx";
import ImportContainer from "../containers/ImportContainer.js";

const docsItems = [
  {
    name: "Ramda",
    href: "http://ramdajs.com/docs/"
  },
  {
    name: "heroes.json",
    href: "./heroes.json"
  },
  {
    name: "Maybe",
    href: "http://folktale.origamitower.com/api/v2.0.0/en/folktale.maybe.html"
  },
  {
    name: "Result",
    href: "http://folktale.origamitower.com/api/v2.0.0/en/folktale.result.html"
  }
];

export default function App(props){

  return (
    <div className="container">
      <div className="container__top menu">
        <div className="menu__img">
          <img src="img/lamda.png" alt="lambda" width={32} height={32} />
        </div>
        <div className="menu__items">
          <div className="menu__item"><LoadContainer /> </div>
          <div className="menu__item">
            <Dropdown items={docsItems}>Docs</Dropdown>
          </div>
          <div className="menu__item">
            <ImportContainer />
          </div>
        </div>
      </div>
      <div className="container__bottom">
        <PanelsContainer />
      </div>
    </div>
  );
}
