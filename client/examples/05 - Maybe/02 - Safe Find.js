import R from "ramda";
import heroes from "heroes";
import Maybe, { Just, Nothing} from "folktale/maybe";

// safeGet :: String → Object -> Maybe a
const safeGet = R.curry((key, obj) =>
  R.has(key, obj) ?
    Just(obj[key]) :
    Nothing());

// safeFind :: String → [Object] -> Maybe Object
const safeFind = R.curry((name, array) => {
  const record = R.find(R.propEq("name", name), array);
  return record ? Just(record) : Nothing();
});

// getAlignment :: String -> [Object] -> Maybe String
const getAlignment = R.identity;

assert.equals(getAlignment("Superman", heroes), Just(Just("good")));
assert.equals(getAlignment("Joker", heroes), Just(Just("bad")));
assert.equals(getAlignment("Bane", heroes), Nothing());
