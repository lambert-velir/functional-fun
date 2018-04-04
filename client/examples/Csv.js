import R from "ramda";

let csv = `
Hamilton, blue
Hamilton, red
Sassafras, green
Laddy, blue
Laddy, green
`;


const parseCsv = R.compose(
  R.identity
);



assert.equals(parseCsv(csv), {
  "Hamilton": [ "blue", "red" ],
  "Sassafras": [ "green" ],
  "Laddy": [ "blue", "green" ]
});
