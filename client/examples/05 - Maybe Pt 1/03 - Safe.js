import R from "ramda";
import { heroes } from "heroes-db";
import Maybe, { Just, Nothing } from "folktale/maybe";

// safe takes a function that may return a null/undefined
// and turns it into a function that returns a Maybe
// safe :: (* → a) → (* → Maybe a)
const safe = fn => R.curryN(
  fn.length,
  R.compose(Maybe.fromNullable, fn)
);

// Use safe to create a safer version of R.head
// (hint: R.head returns undefined if the array is empty)
// safeHead :: [a] → Maybe a
const safeHead = R.identity;  // <---- **** EDIT HERE ****

assert.equals(safeHead(["a", "b", "c"]), Just("a"));
assert.equals(safeHead([]), Nothing());

// Use safe to create a safer version of R.prop
// (hint: R.prop returns undefined if the prop doesn't exist)
// safeProp :: String → Object → Maybe a
const safeProp = R.identity;  // <---- **** EDIT HERE ****

const superman = heroes[0];

assert.equals(safeProp("vehicle", superman), Nothing());
assert.equals(safeProp("alignment", superman), Just("good"));

