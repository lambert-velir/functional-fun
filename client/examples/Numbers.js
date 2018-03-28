import R from "ramda";

// R.multiply :: Number → Number → Number
// double :: Number → Number
const double = R.identity;

assert.equals(double(21), 42);


// doubleAll :: Array Number → Array Number
const doubleAll = R.identity;

assert.equals(
  doubleAll([ 1, 2, 3 ]),
  [ 2, 4, 6 ]
);


// tripleAll :: Array Number → Array Number
const tripleAll = R.identity;

assert.equals(
  tripleAll([ 1, 2, 3 ]),
  [ 3, 6, 9 ]
);
