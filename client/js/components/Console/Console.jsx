import React from "react";
import { arrayOf, oneOf, shape, string } from "prop-types";
import classNames from "classnames";

import X from "../Svg/X.jsx";
import Check from "../Svg/Check.jsx";
import CodeMirror from "codemirror";

export default class Console extends React.Component {


  static propTypes = {
    entries: arrayOf(shape({
      type: oneOf(["pass", "fail", "error", "warn", "log"]),
      message: string
    }))
  };

  componentDidUpdate = () => {

    // handling the CodeMirror manually (instead of react-codemirror2)
    // beacuse it's about twice as fast to initialize

    const types = ["log", "fail", "pass"];
    const selector = types.map(t => `.is-${t} .console__text`).join(", ");
    const els = this.console.querySelectorAll(selector);

    els.forEach(el => {

      const options = {
        value: el.innerText,
        mode: {
          name: "javascript",
          json: true
        },
        readOnly: true,
        foldGutter: true,
        gutters: ["CodeMirror-foldgutter"],
        theme: "github",
        height: "auto",
        width: "auto",
        lineWrapping: true
      };

      // console.log(); will have no message so el will be empty
      if (el.firstChild){
        CodeMirror((cm) => el.replaceChild(cm, el.firstChild), options);
      }

    });
  }


  render = () => {

    const { entries } = this.props;

    return (
      <div className="console" ref={el => this.console = el}>
        {
          entries.map((entry, i) => {

            const { type, message } = entry;

            const classes = classNames(
              "console__message",
              `is-${entry.type}`
            );

            const icon =
                (type === "pass") ? <Check title={"pass!"} />
              : (type === "fail") ? <X title={"fail!"} />
              : null;

            return (
              <div key={i} className={classes}>
                {icon && <div className="console__icon">{icon}</div>}
                <div className="console__text">{message}</div>
              </div>
            );
          })
        }
      </div>
    );
  };
}
