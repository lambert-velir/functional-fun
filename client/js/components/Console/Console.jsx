import React from "react";
import { arrayOf, oneOf, shape, string } from "prop-types";
import classNames from "classnames";

const propTypes = {
  entries: arrayOf(shape({
    type: oneOf(["log", "error"]),
    message: string
  }))
};

const Console = (props) => {

  return (
    <div className="console">
      <div className="console__text">
        {
          props.entries.map((entry, i) => {
            const classes = classNames({
              "console__log": entry.type === "log",
              "console__error": entry.type === "error"
            });

            return (
              <div key={i} className={classes}>{entry.message}</div>
            );
          })
        }
      </div>
    </div>
  );
};

Console.propTypes = propTypes;

export default Console;
