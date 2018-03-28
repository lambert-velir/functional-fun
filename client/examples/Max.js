import R from "ramda";

const greater = (a, b) => (a > b) ? a : b;

// create max using greater and R.map, R.filter, or R.reduce
const max = R.identity;


assert.equals(max([ 1, -3483, 9, 7, 2 ]), 9);
assert.equals(max([ -21, -3483, -2, -1 ]), -1);
