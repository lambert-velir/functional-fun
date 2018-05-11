import R from "ramda";
import Maybe, { Just, Nothing } from "folktale/maybe";

// Write a function that gets the first element of an array (head)
// If the array is empty, return Nothing. Otherwise Just(result).
// safeHead :: [a] → Maybe a
const safeHead = R.identity;  // <---- **** EDIT HERE ****

assert.equals(safeHead(["a", "b", "c"]), Just("a"));
assert.equals(safeHead([]), Nothing());

// Write a function that takes 2 arguments, a number and an array of numbers.
// The function gets the first value in the array and adds the number.
// Your function should also be curried. Hint (see R.curry in the Ramda docs)
// Use safeHead
// addToHead :: Number -> [Number] -> Maybe Number
const addToHead = R.identity;  // <---- **** EDIT HERE ****

const add10ToHead = addToHead(10);

assert.equals(add10ToHead([2, 5, 6]), Just(12));
assert.equals(add10ToHead([]), Nothing());
