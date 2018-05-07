import R from "ramda";


// double :: Number → Number
// Hint: R.multiply :: Number → Number → Number
const double = R.identity;

assert.equals(double(21), 42);


// doubleAll :: [Number] → [Number]
// Hint: R.map
const doubleAll = R.identity;  // <---- **** EDIT HERE ****

assert.equals(
  doubleAll([ 1, 2, 3 ]),
  [ 2, 4, 6 ]
);


// tripleAll :: [Number] → [Number]
const tripleAll = R.identity;  // <---- **** EDIT HERE ****

assert.equals(
  tripleAll([ 1, 2, 3 ]),
  [ 3, 6, 9 ]
);
