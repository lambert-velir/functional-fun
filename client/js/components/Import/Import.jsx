import React from "react";
import R from "ramda";
import { func, string } from "prop-types";
import Select from "../Select/Select.jsx";

const imports = [
  {
    name: "Ramda",
    variable: "R",
    npm: "ramda",
  },
  {
    name: "Heroes DB",
    variable: "DB",
    npm: "heroes-db",
  },
  {
    name: "Files",
    variable: "{ readFile }",
    npm: "files",
  },
  {
    name: "Box",
    variable: "Box",
    npm: "box",
  },
  {
    name: "Maybe",
    variable: "Maybe, { Just, Nothing }",
    npm: "folktale/maybe",
  },
  {
    name: "Result",
    variable: "Result, { Ok, Error }",
    npm: "folktale/result",
  },
  {
    name: "Task",
    variable: "Task",
    npm: "folktale/concurrency/task",
  },
  {
    name: "crocks",
    variable: "crocks",
    npm: "crocks",
  },
];

export default class Import extends React.Component {
  static propTypes = {
    code: string.isRequired,
    onImport: func.isRequired,
  };

  render = () => {
    const { onImport, code } = this.props;

    const isInCode = (importItem) =>
      R.test(RegExp(`import.*?from\\s*?"${importItem.npm}"`), code);

    const addImport = (importItem) => {
      onImport(`import ${importItem.variable} from "${importItem.npm}";\n`);
    };

    const filteredImports = R.reject(isInCode, imports);

    if (filteredImports.length === 0) {
      return null;
    }

    return (
      <Select
        placeholder="Import"
        selectProps={{
          items: filteredImports,
          itemToString: R.prop("name"),
          stateReducer: (state, actionAndChanges) => {
            const { type, changes } = actionAndChanges;

            if (changes.selectedItem) {
              window.requestAnimationFrame(() => {
                addImport(changes.selectedItem);
              });
              return {
                ...changes,
                selectedItem: null,
              };
            }

            return changes;
          },
        }}
      />
    );
  };
}
