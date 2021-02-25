import React from "react";
import Select from "./Select.jsx";

export default {
  title: "Select",
  component: Select,
};
const items = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];

export const select = () => {
  return (
    <Select
      selectProps={{
        items,
        itemToString: (d) => d,
        initialSelectedItem: "Red",
        // isOpen: true,
      }}
      style={{ width: 400 }}
    />
  );
};

export const selectWithPlaceholder = () => {
  return (
    <Select
      selectProps={{
        items,
        itemToString: (d) => d,
        initialSelectedItem: "Red",
        // isOpen: true,
      }}
      placeholder="Select a color"
      style={{ width: 400 }}
    />
  );
};

export const styledSelect = () => {
  // https://flatuicolors.com/palette/defo
  const colors = [
    { label: "Alizarin", value: "red", hex: "#e74c3c" },
    { label: "Carrot", value: "orange", hex: "#e67e22" },
    { label: "Sun Flower", value: "yellow", hex: "#f1c40f" },
    { label: "Turquoise", value: "turquoise", hex: "#1abc9c" },
    { label: "Emerald", value: "green", hex: "#2ecc71" },
    { label: "Peter River", value: "blue", hex: "#3498db" },
    { label: "Amethyst", value: "violet", hex: "#9b59b6" },
  ];

  const Select = (props) => {
    return (
      <select className="select-native" {...props}>
        {colors.map((color) => (
          <option key={color.value} value={color.value}>
            {color.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <Select />
      <br />
      <br />
      <Select disabled />
    </div>
  );
};
styledSelect.storyName = "Styled <select>";
