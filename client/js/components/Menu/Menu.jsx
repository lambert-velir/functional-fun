import * as R from "ramda";
import React from "react";

import Load from "../Load/Load.jsx";
import Import from "../Import/Import.jsx";
import Rerun from "../Svg/Rerun.jsx";
import Select from "../Select/Select.jsx";
import LinkExternal from "../Svg/LinkExternal.jsx";

const docsItems = [
  {
    name: "Ramda",
    href: "http://ramdajs.com/docs/",
  },
  {
    name: "heroes.json",
    href: "./docs/heroes.json",
  },
  {
    name: "heroes-db",
    href: "./docs/heroes-db.html",
  },
  {
    name: "files",
    href: "./docs/files.html",
  },
  {
    name: "Box",
    href: "./docs/box.html",
  },
  {
    name: "Maybe",
    href: "./docs/maybe.html",
  },
  {
    name: "Result",
    href: "./docs/result.html",
  },
  {
    name: "Task",
    href: "./docs/task.html",
  },
  {
    name: "crocks",
    href: "https://evilsoft.github.io/crocks/docs/",
  },
];

import { array, func, string } from "prop-types";

const propTypes = {
  code: string,
  examples: array,
  onLoadChange: func,
  onImport: func,
  onRerun: func.isRequired,
  onFormat: func.isRequired,
};

const Menu = (props) => {
  const { code, examples, onImport, onLoadChange, onRerun, onFormat } = props;

  return (
    <div className="menu">
      <div className="menu__img">
        <img src="img/lamda.png" alt="lambda" width={32} height={32} />
      </div>
      <div className="menu__items">
        <div className="menu__item">
          <Load examples={examples} onChange={onLoadChange} />
        </div>
        <div className="menu__item">
          <Select
            placeholder="Docs"
            renderItem={(item) => {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="menu__dropdown-item"
                >
                  {item.name} <LinkExternal className="dropdown__link-icon" />
                </a>
              );
            }}
            selectProps={{
              items: docsItems,
              itemToString: R.prop("name"),
              stateReducer: (state, actionAndChanges) => {
                const { changes } = actionAndChanges;

                if (changes.selectedItem) {
                  return {
                    ...changes,
                    selectedItem: null,
                  };
                }

                return changes;
              },
            }}
          />
        </div>
        <div className="menu__item">
          <Import code={code} onImport={onImport} />
        </div>
        <div className="menu__item">
          <button type="button" onClick={onFormat}>
            Format
          </button>
        </div>
        <div className="menu__item">
          <button
            type="button"
            className="button--icon"
            title="rerun code"
            onClick={onRerun}
          >
            <Rerun />
          </button>
        </div>
      </div>
    </div>
  );
};

Menu.propTypes = propTypes;

export default Menu;
