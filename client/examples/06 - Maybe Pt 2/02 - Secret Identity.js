import R from "ramda";
import { heroes } from "heroes-db";
import Maybe, { Just, Nothing } from "folktale/maybe";

// safe :: (* → a) → (* → Maybe a)
const safe = (fn) => R.curryN(fn.length, R.compose(Maybe.fromNullable, fn));

// safeProp :: String → Object → Maybe a
const safeProp = safe(R.prop);

// safeFind :: (a → Boolean) → [a] → Maybe a
const safeFind = safe(R.find);

// safeFind :: String → [a] → Maybe a
const safeFindByName = R.curry((name, list) =>
  safeFind(R.propEq("name", name), list),
);

// Write a getRealName function that will get a superhero by name
// and return their real name. Use safeProp and safeFindByName
// getRealName :: String → [a] → Maybe Maybe String
const getRealName = R.identity; // <---- **** EDIT HERE ****

assert.equals(getRealName("Superman", heroes), Just(Just("Clark Kent")));
assert.equals(getRealName("Anti-Monitor", heroes), Just(Nothing()));
assert.equals(getRealName("Bane", heroes), Nothing());

// Rewrite getRealName to flatten the Maybe stack
// getRealName2 :: String → [a] → Maybe String
const getRealName2 = R.identity; // <---- **** EDIT HERE ****

// NOTE: See how the Maybes stack is flattened to just a single Just or Nothing!
assert.equals(getRealName2("Superman", heroes), Just("Clark Kent"));
assert.equals(getRealName2("Anti-Monitor", heroes), Nothing());
assert.equals(getRealName2("Bane", heroes), Nothing());

// render a sentence exposing the hero's secret identity!
// Hint: safeProp, safeFind
// renderSecretIdentity :: String → String
const renderSecretIdentity = R.identity; // <---- **** EDIT HERE ****

assert.equals(
  renderSecretIdentity("Superman", heroes),
  "Superman's secret identity is Clark Kent",
);
assert.equals(
  renderSecretIdentity("Anti-Monitor", heroes),
  "Anti-Monitor doesn't have a secret identity",
);
