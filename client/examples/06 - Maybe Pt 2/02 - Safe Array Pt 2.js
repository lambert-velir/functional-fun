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
// innerHead :: [[a]] -> Maybe a
const innerHead = R.identity;  // <---- **** EDIT HERE ****

assert.equals(innerHead([['a', 'b', 'c'], ['d', 'e', 'f']]), Just('a'));
assert.equals(innerHead([[], ['d', 'e', 'f']]), Nothing());

// Write a function that takes a nested array [[a]] and returns
// the first value of the last array. If **ANY** arrays are empty,
// the whole result should be a Nothing.
// Use safeHead, R.reduce
// allHeads :: [[a]] -> Maybe a
const lastHead = R.identity;  // <---- **** EDIT HERE ****

assert.equals(lastHead([['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]), Just('g'));
assert.equals(lastHead([[], ['d', 'e', 'f']]), Nothing());
assert.equals(lastHead([[]]), Nothing());

// Write a function that takes a nested array [[a]] and returns
// the first value of every inner array. If **ANY** arrays are empty,
// the whole result should be a Nothing.
// Use safeHead, R.reduce
// allHeads :: [[a]] -> Maybe [a]
const allHeads = R.identity;  // <---- **** EDIT HERE ****

assert.equals(allHeads([['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]), Just(['a', 'd', 'g']));
assert.equals(allHeads([[], ['d', 'e', 'f']]), Nothing());
assert.equals(allHeads([[]]), Nothing());
