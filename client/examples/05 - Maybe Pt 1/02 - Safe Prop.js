import R from "ramda";
import { heroes } from "heroes-db";
import Maybe, { Just, Nothing } from "folktale/maybe";

// Write a function that turns R.prop into a safer version
// that returns a Maybe. If the property doesn't exist, it
// should return Nothing, otherwise, it should return Just(result).
// safeProp :: String → Object → Maybe a
// Hint: R.has
const safeProp = R.identity;  // <---- **** EDIT HERE ****

const superman = heroes[0];

assert.equals(safeProp("vehicle", superman), Nothing());
assert.equals(safeProp("alignment", superman), Just("good"));

// Use safeProp to
// 1) get a property from an object
// 2) transform it to all uppercase
// 3) add an exclamation point
// safeYellProp :: String → Object → Maybe String
const safeYellProp = R.identity;  // <---- **** EDIT HERE ****

assert.equals(safeYellProp("vehicle", superman), Nothing());
assert.equals(safeYellProp("alignment", superman), Just("GOOD!"));
