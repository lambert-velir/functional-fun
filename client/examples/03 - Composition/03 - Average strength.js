import R from "ramda";
import heroes from "heroes";

// average :: [Number] → Number
const average = R.converge(R.divide, [R.sum, R.length]);


// averageStrength :: [Hero] → Number
// given a list of heroes, return the average strength of all the heroes
// rounded to the nearest whole number
// exclude heroes that don't have stats.
// Hint: R.path, R.reject, R.isNil, Math.round
const averageStrength = R.compose(
  R.identity
);

assert.equals(averageStrength(heroes), 29);
