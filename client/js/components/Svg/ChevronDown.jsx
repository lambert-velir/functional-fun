import React from "react";
import classNames from "classnames";
import { string } from "prop-types";

const propTypes = {
  width: string,
  height: string,
  className: string,
};

// https://octicons.github.com
const ChevronDown = (props) => {
  const { width = "10", height = "16", className, ...rest } = props;

  return (
    <svg
      className={classNames("octicon octicon-chevron-down", className)}
      viewBox="0 0 10 16"
      version="1.1"
      width={width}
      height={height}
      aria-hidden="true"
      {...rest}
    >
      <path d="M5 11.5l-5-5L1.5 5 5 8.75 8.5 5 10 6.5l-5 5z"></path>
    </svg>
  );
};

ChevronDown.propTypes = propTypes;

export default ChevronDown;
