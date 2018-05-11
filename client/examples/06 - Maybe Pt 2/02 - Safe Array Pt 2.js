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

assert.equals(
  innerHead([['a', 'b', 'c'], ['d', 'e', 'f']]).getOrElse("N/A"),
  'a'
);

assert.equals(
  innerHead([[], ['d', 'e', 'f']]).getOrElse("N/A"),
  "N/A"
);

// Write a function that takes a nested array [[a]] and returns
// the first value of the last array. If **ANY** arrays are empty,
// the whole result should be a Nothing.
// Use safeHead, R.reduce
// allHeads :: [[a]] -> Maybe a
const lastHead = R.identity;  // <---- **** EDIT HERE ****

assert.equals(
  lastHead([['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]).getOrElse("N/A"),
  'g'
);

assert.equals(
  lastHead([[], ['d', 'e', 'f']]).getOrElse("N/A"),
  "N/A"
);

assert.equals(
  lastHead([[]]).getOrElse("N/A"),
  "N/A"
);

// Write a function that takes a nested array [[a]] and returns
// the first value of every inner array. If **ANY** arrays are empty,
// the whole result should be a Nothing.
// Use safeHead, R.reduce
// allHeads :: [[a]] -> Maybe [a]
const allHeads = R.identity;  // <---- **** EDIT HERE ****

assert.equals(
  allHeads([['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]).getOrElse("N/A"),
  ['a', 'd', 'g']
);

assert.equals(
  allHeads([[], ['d', 'e', 'f']]).getOrElse("N/A"),
  "N/A"
);

assert.equals(
  allHeads([[]]).getOrElse("N/A"),
  "N/A"
);
