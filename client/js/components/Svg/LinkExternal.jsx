import React from "react";
import classNames from "classnames";
import { string } from "prop-types";

const propTypes = {
  width: string,
  height: string,
  className: string,
};

// https://octicons.github.com
const LinkExternal = (props) => {
  const { width = "12", height = "16", className, ...rest } = props;

  return (
    <svg
      className={classNames("octicon octicon-link-external", className)}
      viewBox="0 0 12 16"
      version="1.1"
      width={width}
      height={height}
      aria-hidden="true"
      {...rest}
    >
      <path d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"></path>
    </svg>
  );
};

LinkExternal.propTypes = propTypes;

export default LinkExternal;
