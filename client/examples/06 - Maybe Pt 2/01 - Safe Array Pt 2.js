import R from "ramda";
import Maybe, { Just, Nothing } from "folktale/maybe";

// safe :: (* → a) → (* → Maybe a)
const safe = fn => R.curryN(
  fn.length,
  R.compose(Maybe.fromNullable, fn)
);

// safeHead :: [a] → Maybe a
const safeHead = safe(R.head);


// Write a function that takes a nested array [[a]] and returns the
// first value of the inner array
// Use safeHead
// innerHead :: [[a]] → Maybe a
const innerHead = R.identity;  // <---- **** EDIT HERE ****

assert.equals(innerHead([["a", "b", "c"], ["d", "e", "f"]]), Just("a"));
assert.equals(innerHead([[], ["d", "e", "f"]]), Nothing());
