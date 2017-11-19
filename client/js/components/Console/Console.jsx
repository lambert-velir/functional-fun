import React from "react";
import { arrayOf, shape, string } from "prop-types";
import classNames from "classnames";

const propTypes = {
  entries: arrayOf(shape({
    type: string,
    message: string
  }))
};

const Console = (props) => {

  return (
    <div className="console">
      {
        props.entries.map((entry, i) => {
          const classes = classNames(
            "console__message",
            `is-${entry.type}`
          );

          return (
            <div key={i} className={classes}>
              <div className="console__text">{entry.message}</div>
            </div>
          );
        })
      }
    </div>
  );
};

Console.propTypes = propTypes;

export default Console;
