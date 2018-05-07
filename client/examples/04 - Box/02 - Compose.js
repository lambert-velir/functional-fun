import R from "ramda";
import Box from "box";

// splitAndBox is a function that performs a split
// operation and then wraps the result up in a Box.
// splitAndBox :: String → String → Box([String])
const splitAndBox = s => R.compose(
  Box,
  R.split(s)
);

// Use splitAndBox, plus R.compose to rewrite the toSlug function
// toSlug :: String → Box(Box(String))
const toSlug = R.compose(
  // <---- **** EDIT HERE ****
);

assert.equals(toSlug("Functional Fun"), "functional-fun");
