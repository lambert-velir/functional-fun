import R from "ramda";
import { heroes } from "heroes-db";

// slowestSpeed :: [Hero] → Number
// given a list of heroes, return the slowest speed
// Hint: R.reduce, R.min
const slowestSpeed = R.compose(
  R.identity, // <---- **** EDIT HERE ****
);

assert.equals(slowestSpeed(heroes), 12);

// slowestHeroes :: [Hero] → [String]
// return a list of all the names of the heroes who are the slowest
// Hint: R.pathEq
const slowestHeroes = heroes =>
  R.compose(
    R.identity, // <---- **** EDIT HERE ****
  )(heroes);

assert.equals(slowestHeroes(heroes), [
  "Joker",
  "Two-Face",
  "Penguin",
  "Riddler",
]);
