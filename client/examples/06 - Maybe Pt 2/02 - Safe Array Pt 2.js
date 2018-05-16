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


// Write a function that takes a nested array [[a]] and returns
// the first value of each inner array, wrapped in a Maybe.
// Use safeHead
// allHeads :: [[a]] → [Maybe a]
const allHeads = R.identity;  // <---- **** EDIT HERE ****

assert.equals(allHeads([["a", "b", "c"], ["d", "e", "f"], ["g"]]), [Just("a"), Just("d"), Just("g")]);
assert.equals(allHeads([[], ["d", "e", "f"]]), [Nothing(), Just("d")]);
assert.equals(allHeads([[]]), [Nothing()]);


// Write a function that takes a nested array [[a]] and returns
// the first value of each inner array. If **ANY** arrays are empty,
// the whole result should be a Nothing.
// Similar to allHeads, except this time, the array is wrapped in one outer Maybe.
// Use safeHead, reduce
// allHeads :: [[a]] → Maybe [a]
const allHeads2 = R.identity;  // <---- **** EDIT HERE ****

assert.equals(allHeads2([["a", "b", "c"], ["d", "e", "f"], ["g"]]), Just(["a", "d", "g"]));
assert.equals(allHeads2([[], ["d", "e", "f"]]), Nothing());
assert.equals(allHeads2([[]]), Nothing());
