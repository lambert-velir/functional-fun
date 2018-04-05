import React from "react";
import { string } from "prop-types";

const propTypes = {
  width: string,
  height: string
};

// https://octicons.github.com/icon/check/
const Check = (props) => {

  const { width = "16", height = "16",  ...rest } = props;

  return (
    <svg width={width} height={height} className="octicon octicon-check"
      viewBox="0 0 12 16" aria-hidden="true" {...rest}
    >
      <path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z" />
    </svg>
  );
};

Check.propTypes = propTypes;

export default Check;
