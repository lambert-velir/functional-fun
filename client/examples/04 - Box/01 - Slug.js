import R from "ramda";
import Box from "box";


// Use Box to write a function that takes a string
// and turns it into a "slug". i.e. lowercases and replaces
// whitespace with dashes.
// toSlug :: String → String
const toSlug = s => Box(s)  // <---- **** EDIT HERE ****


assert.equals(toSlug("Functional fun"), "functional-fun");
