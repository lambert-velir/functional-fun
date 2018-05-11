import R from "ramda";
import { heroes } from "heroes-db";
import Maybe, { Just, Nothing } from "folktale/maybe";

// safe :: (* → a) → (* → Maybe a)
const safe = fn => R.curryN(
  fn.length,
  R.compose(Maybe.fromNullable, fn)
);

// safeProp :: String → Object → Maybe a
const safeProp = safe(R.prop);

// safeFind :: (a → Boolean) → [a] → Maybe a
const safeFind = safe(R.find);

// safeFind :: String → [a] → Maybe a
const safeFindByName = R.curry(
  (name, list) => safeFind(R.propEq("name", name), list)
);

// Write a getAlignment function that will get a superhero by name
// and return their alignment. Use safeProp, safeFind and safeFindByName
// getAlignment :: String → [a] → Maybe Maybe String
const getAlignment = R.identity;  // <---- **** EDIT HERE ****

assert.equals(getAlignment("Superman", heroes), Just(Just("good")));
assert.equals(getAlignment("Joker", heroes), Just(Just("bad")));
assert.equals(getAlignment("Bane", heroes), Nothing());

// Rewrite getAlignment to flatten the Maybe stack
// getAlignment2 :: String → [a] → Maybe String
const getAlignment2 = R.identity;  // <---- **** EDIT HERE ****

// NOTE: See how the Maybes stack is flattened to just a single Just or Nothing!
assert.equals(getAlignment2("Superman", heroes), Just("good"));
assert.equals(getAlignment2("Joker", heroes), Just("bad"));
assert.equals(getAlignment2("Bane", heroes), Nothing());
