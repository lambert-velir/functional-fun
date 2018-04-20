import R from "ramda";
import heroes from "heroes";
import Maybe, { Just, Nothing} from "folktale/maybe";

// Write a function that turns R.prop into a safer version
// that returns a Maybe
// safeProp :: String → Object -> Maybe a
const safeProp = R.Identity;

const superman = heroes[0];

assert.equals(
  safeProp("vehicle", superman).getOrElse("N/A"),
  "N/A");

assert.equals(
  safeProp("alignment", superman).getOrElse("N/A"),
  "good");
