import React from "react";
import { arrayOf, shape, string } from "prop-types";
import classNames from "classnames";

import X from "../Svg/X.jsx";
import Check from "../Svg/Check.jsx";

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

          const { type, message } = entry;

          const classes = classNames(
            "console__message",
            `is-${entry.type}`
          );

          const icon =
            (type === "pass") ? <Check title={"pass!"} />
              : (type === "fail") ? <X title={"fail!"}/>
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

Console.propTypes = propTypes;

export default Console;
