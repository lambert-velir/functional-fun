import R from "ramda";
import Box from "box";

// splitAndBox :: String → String -> Box([String])
const splitAndBox = s => R.compose(
  Box,
  R.split(s));

// toSlug :: String → Box(Box(String))
const toSlug = R.compose(
  R.toLower,
  R.join('-'),
  splitAndBox(' '));

assert.equals(toSlug("Functional Fun"), "functional-fun");
