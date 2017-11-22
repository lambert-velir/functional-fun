import R from "ramda";

let csv = `
Hamilton, blue
Hamilton, red
Sassafras, green
Laddy, blue
Laddy, green
`;

const result = null;



assert.equals(result,
  [
    {
      "name": "Hamilton",
      "colors": [
        "blue",
        "red"
      ]
    },
    {
      "name": "Sassafras",
      "colors": [
        "green"
      ]
    },
    {
      "name": "Laddy",
      "colors": [
        "blue",
        "green"
      ]
    }
  ]
);
