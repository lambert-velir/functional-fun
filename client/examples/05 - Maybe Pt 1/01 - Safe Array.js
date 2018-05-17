import R from "ramda";
import Maybe, { Just, Nothing } from "folktale/maybe";

// Write a function that gets the first element of an array (head)
// If the array is empty, return Nothing(), otherwise Just(result).
// safeHead :: [a] → Maybe a
const safeHead = R.identity;  // <---- **** EDIT HERE ****

assert.equals(safeHead(["a", "b", "c"]), Just("a"));
assert.equals(safeHead([]), Nothing());


// Write a function that takes 2 arguments, a number and an array of numbers.
// The function gets the first value in the array and adds the number.
// Your function should also be curried.
// Hint: safeHead
// addToHead :: Number → [Number] → Maybe Number
const addToHead = (n, arr) => R.identity;  // <---- **** EDIT HERE ****


assert.equals(addToHead(10, [2, 5, 6]), Just(12));
assert.equals(addToHead(10, []), Nothing());
