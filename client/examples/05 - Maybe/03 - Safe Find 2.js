import R from "ramda";
import heroes from "heroes";
import Maybe, { Just, Nothing} from "folktale/maybe";

// safe :: (* -> a) -> (* -> Maybe a)
const safe = fn => R.curryN(
    fn.length,
    R.compose(Maybe.fromNullable, fn));

// safeProp :: String s => s → {s: a} -> Maybe a
const safeProp = safe(R.prop);

// safeFind :: (a -> Boolean) → [a] -> Maybe a
const safeFind = safe(R.find);

// safeFind :: String → [a] -> Maybe a
const safeFindByName = R.curry((name, list) =>
  safeFind(R.propEq("name", name), list));

// Write a getAlignment function that will get a superhero by name
// and return their alignment
// getAlignment :: String -> [a] -> Maybe String
const getAlignment = R.identity;

assert.equals(getAlignment("Superman", heroes), Just("good"));
assert.equals(getAlignment("Joker", heroes), Just("bad"));
assert.equals(getAlignment("Bane", heroes), Nothing());
