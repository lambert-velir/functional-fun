import R from "ramda";
import Box from "box";
import { heroes } from "heroes-db";


// averageIntelligence :: [Hero] → Number
// given a list of heroes, return the average intelligence of all the heroes
// rounded to the nearest whole number
// exclude heroes that don't have stats.
// Hint: R.path, R.reject, R.isNil, Math.round
const averageIntelligence = heroes => Box(heroes); // <---- **** EDIT HERE ****


assert.equals(averageIntelligence(heroes), 82);
