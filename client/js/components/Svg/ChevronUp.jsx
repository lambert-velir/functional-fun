import React from "react";
import classNames from "classnames";
import { string } from "prop-types";

const propTypes = {
  width: string,
  height: string,
  className: string,
};

// https://octicons.github.com
const ChevronUp = props => {
  const { width = "10", height = "16", className, ...rest } = props;

  return (
    <svg
      className={classNames("octicon octicon-chevron-up", className)}
      viewBox="0 0 10 16"
      version="1.1"
      width={width}
      height={height}
      aria-hidden="true"
      {...rest}
    >
      <path d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z"></path>
    </svg>
  );
};

ChevronUp.propTypes = propTypes;

export default ChevronUp;
