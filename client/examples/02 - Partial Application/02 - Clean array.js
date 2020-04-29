import R from "ramda";

// cleanArray :: [Number] → [Number]
// remove all the null/undefined values from an array
// Hint: R.reject, R.isNil
const cleanArray = R.identity; // <---- **** EDIT HERE ****

assert.equals(cleanArray([1, 2, null, 3, 4, null]), [1, 2, 3, 4]);
