import React from "react";
import { arrayOf, func, shape, string } from "prop-types";

const propTypes = {
  examples: arrayOf(shape({
    displayName: string.isRequired,
    slug: string.isRequired
  })).isRequired,
  onChange: func.isRequired
};

const Examples = (props) => {
  const { examples, onChange } = props;

  return (
    <span>
      {/* value is "" so the "Select..." option is always selected */}
      <select onChange={e => onChange(e.target.value)} value="">
        <option value="">Select...</option>
        {examples.map(example => {
          const { displayName, slug } = example;
          return (
            <option key={slug} value={slug}>{displayName}</option>
          );
        })}
      </select>
    </span>
  );
};

Examples.propTypes = propTypes;

export default Examples;
