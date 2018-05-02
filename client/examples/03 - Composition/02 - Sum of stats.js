import R from "ramda";
import { heroes } from "heroes-db";


// sumHeroStats :: Hero → Number
// given a hero, return the sum of their stats
// Hint: R.prop, R.values, R.sum
const sumHeroStats = R.compose(
  R.identity
);

assert.equals(sumHeroStats(heroes[0]), 585);
assert.equals(sumHeroStats(heroes[1]), 324);
assert.equals(sumHeroStats(heroes[2]), 290);
