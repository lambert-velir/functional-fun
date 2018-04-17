import R from "ramda";
import Box from "box";

// splitAndBox :: String → String -> Box([String])
const splitAndBox = s => R.compose(
  Box,
  R.split(s));

// joinAndBox :: String → [String] -> Box(String)
const joinAndBox = s => R.compose(
  Box,
  R.join(s));

// toSlug :: String → Box(Box(String))
const toSlug = R.compose(
  R.toLower,
  joinAndBox('-'),
  splitAndBox(' '));

assert.equals(toSlug("Functional Fun"), "functional-fun");
