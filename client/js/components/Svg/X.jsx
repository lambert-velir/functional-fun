import React from "react";
import { string } from "prop-types";

const propTypes = {
  width: string,
  height: string,
};

// https://octicons.github.com/icon/x/
const X = props => {
  const { width = "16", height = "16", ...rest } = props;

  return (
    <svg
      width={width}
      height={height}
      className="octicon octicon-x"
      viewBox="0 0 12 16"
      aria-hidden="true"
      {...rest}
    >
      <path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z" />
    </svg>
  );
};

X.propTypes = propTypes;

export default X;
