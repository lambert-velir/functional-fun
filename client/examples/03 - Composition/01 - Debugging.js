import R from "ramda";


// R.tap :: (a → *) → a → a
// Runs the given function with the supplied object, then returns the object.
// Use R.tap below to show the value as it changes flowing through the pipeline


// nextNumber :: String → String
const nextNumber = R.compose(
  R.toString,
  n => n + 1,
  parseInt,
  R.trim
);

assert.equals(nextNumber("     41    "), "42");
