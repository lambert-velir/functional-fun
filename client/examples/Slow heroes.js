import R from "ramda";
import heroes from "heroes";


// given a list of heroes, return the slowest speed
// Hint: R.reduce, R.min
const slowestSpeed = R.compose(
  R.identity
);

assert.equals(slowestSpeed(heroes), 12);



// return a list of all the names of the heroes who are the slowest
const slowestHeroes = heroes => R.compose(
  R.identity
)(heroes);

assert.equals(
  slowestHeroes(heroes),
  [ "Joker", "Two-Face", "Penguin", "Riddler" ]
);
