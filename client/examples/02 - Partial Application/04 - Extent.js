import R from "ramda";


// max :: [Number] → Number
// return the largest number of the given array
// Hint: R.reduce, R.max
const max = R.identity;

assert.equals(max([ 1, 2, 3 ]), 3);
assert.equals(max([ -21, -3483, -2, -1 ]), -1);


// min :: [Number] → Number
// return the largest number of the given array
const min = R.identity;

assert.equals(min([ 1, -3483, 9, 7, 2 ]), -3483);
assert.equals(min([ 1, 2, 3 ]), 1);
