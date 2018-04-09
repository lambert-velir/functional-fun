import R from "ramda";
import heroes from "heroes";


// slowestSpeed :: [Hero] → Number
// given a list of heroes, return the slowest speed
// Hint: R.reduce, R.min
const slowestSpeed = R.compose(
  R.identity
);

assert.equals(slowestSpeed(heroes), 12);


// slowestHeroes :: [Hero] → [String]
// return a list of all the names of the heroes who are the slowest
// Hing: R.pathEq
const slowestHeroes = heroes => R.compose(
  R.identity
)(heroes);

assert.equals(
  slowestHeroes(heroes),
  [ "Joker", "Two-Face", "Penguin", "Riddler" ]
);
