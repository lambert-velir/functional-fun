import R from "ramda";
import Box from "box";
import { heroes } from "heroes-db";


// sumHeroStats :: Hero → Number
// given a hero, return the sum of their stats
// Hint: R.prop, R.values, R.sum
const sumHeroStats = hero => Box(hero); // <---- **** EDIT HERE ****


assert.equals(sumHeroStats(heroes[0]), 585);
assert.equals(sumHeroStats(heroes[1]), 324);
assert.equals(sumHeroStats(heroes[2]), 290);
