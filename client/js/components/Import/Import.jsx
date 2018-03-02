import React from "react";
import R from "ramda";
import classNames from "classnames";
import { func, string } from "prop-types";

const imports = [
  {
    name: "Maybe",
    "variable": "Maybe, { Just, Nothing }",
    "npm": "folktale/maybe"
  },
  {
    name: "Result",
    "variable": "Result, { Ok, Error }",
    "npm": "folktale/result"
  },
  // {
  //   name: "Task",
  //   "variable": "Task",
  //   "npm": "folktale/concurrency/task"
  // },
  {
    name: "heros.json",
    "variable": "heroes",
    "npm": "heroes"
  },
  {
    "name": "Ramda",
    "variable": "R",
    "npm": "ramda"
  }
];

export default class Import extends React.Component {

  static propTypes = {
    code: string.isRequired,
    onImport: func.isRequired,
    className: string
  };

  state = {
    isOpen: false
  }

  componentWillUnmount = () => {
    window.removeEventListener("click", this.close, true);
    window.removeEventListener("keyup", this.listenForEsc);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { isOpen } = this.state;

    if (isOpen){
      window.addEventListener("click", this.close, true);
      window.addEventListener("keyup", this.listenForEsc);
    }
    else {
      window.removeEventListener("click", this.close, true);
      window.removeEventListener("keyup", this.listenForEsc);
    }
  }

  listenForEsc = (e) => {
    if (e.key || e.keyCode === 27){
      this.close();
    }
  }

  open = (e) => {
    this.setState({ isOpen: true });
  }

  close = (e) => {
    this.setState({ isOpen: false });
  }

  render = () => {

    const { isOpen } = this.state;
    const { onImport, code, className = "", ...rest } = this.props;

    const isInCode = (importItem) => R.test(RegExp(importString(importItem)), code);

    const importString = (importItem) => `import ${importItem.variable} from "${importItem.npm}";`;

    const addImport = (importItem) => (e) => {
      this.close();
      onImport(`${importString(importItem)}\n`);
    };

    const importClasses = classNames("import", className, {
      "is-open": isOpen
    });

    const filteredImports = R.reject(isInCode, imports);

    if (filteredImports.length === 0){
      return null;
    }

    return (
      <div className={importClasses} {...rest}>
        <div className="import__label" onClick={this.open}>import</div>

        {filteredImports.map((importItem) => (
          <button type="button"
            key={importItem.variable}
            className="import__button"
            href="#" onClick={addImport(importItem)}
          >
            {importItem.name}
          </button>
        ))}
      </div>
    );
  };
}
