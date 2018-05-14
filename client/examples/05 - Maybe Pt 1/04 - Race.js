import R from "ramda";
import Maybe, { Just, Nothing } from "folktale/maybe";
import { heroes } from "heroes-db";


// safe takes a function that may return a null/undefined
// and turns it into a function that returns a Maybe
// safe :: (* → a) → (* → Maybe a)
const safe = fn => R.curryN(
  fn.length,
  R.compose(Maybe.fromNullable, fn)
);

const safePath = safe(R.path);

const capitalize = R.replace(/^./, R.toUpper);

const renderRace = hero => safePath(["appearance", "race"], hero)
  .map(capitalize)
  .map(race => `${hero.name} is a ${race}.`)
  .getOrElse(`${hero.name} has no race.`);


assert.equals(renderRace(heroes[0]), "Superman is a Kryptonian.");
assert.equals(renderRace(heroes[1]), "Batman is a Human.");
assert.equals(renderRace(heroes[3]), "Two-Face has no race.");
