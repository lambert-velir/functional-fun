import R from "ramda";
import { heroes } from "heroes-db";

// average :: [Number] → Number
const average = (arr) => R.sum(arr) / R.length(arr);

// averageStrength :: [Hero] → Number
// given a list of heroes, return the average strength of all the heroes
// rounded to the nearest whole number
// exclude heroes that don't have stats.
// Hint: R.path, R.reject, R.isNil, Math.round
const averageStrength = R.compose(
  R.identity, // <---- **** EDIT HERE ****
);

assert.equals(averageStrength(heroes), 29);
