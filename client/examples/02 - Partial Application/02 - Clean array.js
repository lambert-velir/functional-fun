import R from "ramda";


// remove all the null/undefined values from an array
// Hint: R.reject, R.isNil
const cleanArray = R.identity;

assert.equals(
  cleanArray([1, 2, null, 3, 4, null]),
  [1, 2, 3, 4]
);
